// services/marketplaceService.ts
import { supabase } from '../supabase'

export interface UserDetails {
  id: string
  fullName: string
  email: string
  role: string  // Will always be lowercase: 'buyer' or 'farmer'
  phone?: string
  address?: string
  avatar?: string
  firstName?: string
  lastName?: string
  username?: string
}

class MarketplaceService {
  // CRITICAL: Helper function to normalize role
  private normalizeRole(role: string | null | undefined): 'buyer' | 'farmer' {
    if (!role) {
      return 'buyer';
    }

    const trimmed = role.trim();
    const lower = trimmed.toLowerCase();

    // Check against known roles (case-insensitive)
    if (lower === 'farmer') {
      return 'farmer';
    } else {
      return 'buyer';
    }
  }

  // Get user details from profiles table
  async getUserDetails(userId: string): Promise<UserDetails | null> {
    try {
      console.log('🔍 ===== FETCHING USER DETAILS =====');
      console.log('   User ID:', userId);
      
      // STEP 1: Try to get from profiles table (PRIMARY SOURCE)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.log('⚠️ Error fetching from profiles:', profileError.message);
      }
      
      if (!profileError && profileData) {
        console.log('✅ Found user in profiles table');
        
        const firstName = (profileData.first_name || '').trim();
        const lastName = (profileData.last_name || '').trim();
        const username = (profileData.username || '').trim();
        const email = profileData.email || '';
        const phone = profileData.phone || '';
        const address = profileData.address || '';
        const avatar = profileData.avatar_url || '';
        
        // CRITICAL: Get role from profiles table and normalize it
        const rawRole = profileData.role;
        const normalizedRole = this.normalizeRole(rawRole);
        
        console.log('   🎭 Role from database:', `"${rawRole}"`);
        console.log('   🎯 Normalized role:', `"${normalizedRole}"`);
        
        // Build full name
        let fullName = '';
        if (firstName && lastName) {
          fullName = `${firstName} ${lastName}`;
        } else if (firstName) {
          fullName = firstName;
        } else if (lastName) {
          fullName = lastName;
        } else if (username) {
          fullName = username;
        } else if (email) {
          fullName = email.split('@')[0];
        } else {
          fullName = 'Unknown User';
        }
        
        console.log('   👤 Full name:', fullName);
        console.log('   📧 Email:', email);
        console.log('   🎯 Final normalized role:', normalizedRole);
        console.log('===================================\n');
        
        return {
          id: userId,
          fullName,
          email,
          role: normalizedRole,
          phone,
          address,
          avatar,
          firstName,
          lastName,
          username
        };
      }
      
      // STEP 2: Fallback to auth user metadata (SECONDARY SOURCE)
      console.log('⚠️ User not found in profiles, checking auth metadata');
      
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.log('❌ Error fetching auth user:', authError.message);
        return null;
      }
      
      if (authUser && authUser.id === userId) {
        console.log('✅ Found user in auth');
        
        const email = authUser.email || '';
        const emailPrefix = email.split('@')[0] || 'Unknown User';
        
        const metadata = authUser.user_metadata || {};
        const firstName = (metadata.firstname || metadata.firstName || metadata.first_name || '').trim();
        const lastName = (metadata.lastname || metadata.lastName || metadata.last_name || '').trim();
        const username = (metadata.username || '').trim();
        const phone = metadata.phone || '';
        const address = metadata.address || '';
        const avatar = metadata.avatar_url || '';
        
        // CRITICAL: Normalize role from auth metadata
        const rawRole = metadata.role;
        const normalizedRole = this.normalizeRole(rawRole);
        
        console.log('   🎭 Role from auth metadata:', `"${rawRole}"`);
        console.log('   🎯 Normalized role:', `"${normalizedRole}"`);
        
        // Build full name
        let fullName = '';
        if (firstName && lastName) {
          fullName = `${firstName} ${lastName}`;
        } else if (firstName) {
          fullName = firstName;
        } else if (lastName) {
          fullName = lastName;
        } else if (username) {
          fullName = username;
        } else {
          fullName = emailPrefix;
        }
        
        console.log('   👤 Full name:', fullName);
        console.log('   📧 Email:', email);
        console.log('   🎯 Final normalized role:', normalizedRole);
        console.log('===================================\n');
        
        return {
          id: userId,
          fullName,
          email,
          role: normalizedRole,
          phone,
          address,
          avatar,
          firstName,
          lastName,
          username
        };
      }
      
      console.log('❌ No user data found for user_id:', userId);
      console.log('===================================\n');
      return null;
    } catch (error) {
      console.error('💥 Exception while fetching user details:', error);
      return null;
    }
  }

  // Get multiple users at once
  async getMultipleUsers(userIds: string[]): Promise<{ [userId: string]: UserDetails }> {
    try {
      console.log('📞 Fetching multiple users, count:', userIds.length);
      
      if (userIds.length === 0) {
        return {};
      }

      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('*')
        .in('id', userIds);

      if (error) {
        console.error('❌ Error fetching profiles data:', error);
      }

      console.log('✅ Fetched profiles data from database, count:', profilesData?.length || 0);

      const userLookup: { [userId: string]: UserDetails } = {};
      
      profilesData?.forEach(profile => {
        const firstName = (profile.first_name || '').trim();
        const lastName = (profile.last_name || '').trim();
        const username = (profile.username || '').trim();
        const email = profile.email || '';
        const phone = profile.phone || '';
        const address = profile.address || '';
        const avatar = profile.avatar_url || '';
        
        const rawRole = profile.role;
        const normalizedRole = this.normalizeRole(rawRole);
        
        let fullName = '';
        if (firstName && lastName) {
          fullName = `${firstName} ${lastName}`;
        } else if (firstName) {
          fullName = firstName;
        } else if (lastName) {
          fullName = lastName;
        } else if (username) {
          fullName = username;
        } else if (email) {
          fullName = email.split('@')[0];
        } else {
          fullName = 'Unknown User';
        }
        
        userLookup[profile.id] = {
          id: profile.id,
          fullName,
          email,
          role: normalizedRole,
          phone,
          address,
          avatar,
          firstName,
          lastName,
          username
        };
      });

      for (const userId of userIds) {
        if (!userLookup[userId]) {
          const userDetails = await this.getUserDetails(userId);
          
          if (userDetails) {
            userLookup[userId] = userDetails;
          } else {
            userLookup[userId] = {
              id: userId,
              fullName: 'Unknown User',
              email: 'N/A',
              role: 'buyer'
            };
          }
        }
      }

      console.log('✅ Complete user lookup map created, count:', Object.keys(userLookup).length);
      return userLookup;
    } catch (error) {
      console.error('💥 Error fetching multiple users:', error);
      return {};
    }
  }

  // ===== NEW: SYNC BOTH AUTH AND PROFILES =====
  
  /**
   * Update user role in BOTH profiles table AND auth metadata
   * This prevents flickering by keeping both sources in sync
   */
  async updateUserRole(userId: string, newRole: 'buyer' | 'farmer'): Promise<boolean> {
    try {
      console.log(`🔄 ===== UPDATING USER ROLE =====`);
      console.log(`   User ID: ${userId}`);
      console.log(`   New Role: "${newRole}"`);
      
      // STEP 1: Update profiles table
      console.log('   📝 Updating profiles table...');
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          role: newRole,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) {
        console.error('   ❌ Error updating profiles table:', profileError);
        return false;
      }
      console.log('   ✅ Profiles table updated');

      // STEP 2: Update auth metadata
      console.log('   📝 Updating auth metadata...');
      const { error: authError } = await supabase.auth.updateUser({
        data: { role: newRole }
      });

      if (authError) {
        console.error('   ❌ Error updating auth metadata:', authError);
        // Don't return false - profiles is already updated, which is the source of truth
        console.log('   ⚠️ Auth metadata update failed, but profiles is updated (OK)');
      } else {
        console.log('   ✅ Auth metadata updated');
      }

      console.log('✅ Role update complete!');
      console.log('===================================\n');
      return true;
    } catch (error) {
      console.error('💥 Exception updating role:', error);
      return false;
    }
  }

  /**
   * Upgrade user from buyer to farmer
   * Updates both profiles and auth, returns success status
   */
  async upgradeToFarmer(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log(`🚜 ===== UPGRADING USER TO FARMER =====`);
      console.log(`   User ID: ${userId}`);
      
      // Check current role
      const currentDetails = await this.getUserDetails(userId);
      
      if (!currentDetails) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      if (currentDetails.role === 'farmer') {
        return {
          success: true,
          message: 'User is already a farmer'
        };
      }

      // Update role to farmer
      const success = await this.updateUserRole(userId, 'farmer');

      if (success) {
        console.log('✅ Successfully upgraded to farmer!');
        return {
          success: true,
          message: 'Successfully upgraded to farmer'
        };
      } else {
        console.log('❌ Failed to upgrade to farmer');
        return {
          success: false,
          message: 'Failed to update role'
        };
      }
    } catch (error) {
      console.error('💥 Exception during upgrade:', error);
      return {
        success: false,
        message: 'An error occurred during upgrade'
      };
    }
  }

  /**
   * Check if auth metadata is in sync with profiles table
   * Returns true if they match, false if they need syncing
   */
  async checkRoleSync(userId: string): Promise<{ inSync: boolean; profileRole: string; authRole: string }> {
    try {
      // Get role from profiles
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      // Get role from auth
      const { data: { user } } = await supabase.auth.getUser();
      
      const profileRole = this.normalizeRole(profileData?.role);
      const authRole = this.normalizeRole(user?.user_metadata?.role);

      const inSync = profileRole === authRole;

      console.log('🔍 Role sync check:', {
        inSync,
        profileRole,
        authRole
      });

      return {
        inSync,
        profileRole,
        authRole
      };
    } catch (error) {
      console.error('Error checking role sync:', error);
      return {
        inSync: false,
        profileRole: 'buyer',
        authRole: 'buyer'
      };
    }
  }

  /**
   * Force sync auth metadata with profiles table
   * Use this to fix any mismatches
   */
  async syncAuthWithProfiles(userId: string): Promise<boolean> {
    try {
      console.log('🔄 Syncing auth with profiles...');
      
      // Get role from profiles (source of truth)
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (!profileData) {
        console.error('No profile found');
        return false;
      }

      const correctRole = this.normalizeRole(profileData.role);

      // Update auth to match
      const { error } = await supabase.auth.updateUser({
        data: { role: correctRole }
      });

      if (error) {
        console.error('Error syncing:', error);
        return false;
      }

      console.log('✅ Auth synced with profiles:', correctRole);
      return true;
    } catch (error) {
      console.error('Exception syncing:', error);
      return false;
    }
  }
}

export const marketplaceService = new MarketplaceService();