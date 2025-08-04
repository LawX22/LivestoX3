  <!-- DesignSystemGuide.vue -->
  <template>
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 p-4 relative overflow-hidden">
      <!-- Floating Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
        <div class="absolute top-32 right-16 w-12 h-12 bg-emerald-300 rounded-full opacity-40 animate-pulse"></div>
        <div class="absolute bottom-24 left-24 w-20 h-20 bg-teal-300 rounded-full opacity-25 animate-ping"></div>
        <div class="absolute top-1/2 right-8 w-10 h-10 bg-green-400 rounded-full opacity-35 animate-bounce" style="animation-delay: 1s"></div>
        <div class="absolute bottom-1/3 right-1/3 w-8 h-8 bg-emerald-400 rounded-full opacity-20 animate-pulse" style="animation-delay: 0.5s"></div>
        <div class="absolute top-1/4 left-1/3 w-14 h-14 bg-teal-400 rounded-full opacity-25 animate-bounce" style="animation-delay: 1.5s"></div>
      </div>

      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#059669" stroke-width="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <!-- Toast Demo -->
      <div v-if="showToast" class="fixed top-4 right-4 z-50">
        <div class="max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 border-green-400 p-4 transform transition-all duration-300 ease-in-out">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <h4 class="text-sm font-semibold text-gray-900 mb-1">Design System Demo</h4>
              <div class="text-sm text-gray-700">This toast showcases our notification styling pattern.</div>
            </div>
            <button @click="showToast = false" class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden max-w-7xl mx-auto border border-white/30">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-20 h-20 bg-white opacity-15 rounded-full -translate-y-10 translate-x-10 animate-pulse"></div>
          <div class="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-15 rounded-full translate-y-6 -translate-x-6 animate-pulse"></div>
          
          <div class="relative z-10">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-white bg-opacity-80 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">Design System Guide</h1>
                <p class="text-green-100 text-sm opacity-90">Complete style reference for consistent UI development</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="bg-white border-b border-gray-200">
          <div class="flex space-x-4 px-6 overflow-x-auto">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-4 px-3 border-b-2 font-medium text-sm transition-colors duration-300 whitespace-nowrap',
                activeTab === tab.id 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Content Area -->
        <div class="p-6">
          <!-- Colors & Gradients Tab -->
          <div v-if="activeTab === 'colors'" class="space-y-8">
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Color Palette</h2>
              
              <!-- Primary Colors -->
              <div class="mb-6">
                <h3 class="text-base font-semibold text-gray-700 mb-3">Primary Green Spectrum</h3>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div class="bg-green-300 h-20 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm">green-300</div>
                  <div class="bg-green-400 h-20 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm">green-400</div>
                  <div class="bg-green-500 h-20 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm">green-500</div>
                  <div class="bg-green-600 h-20 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm">green-600</div>
                  <div class="bg-emerald-300 h-20 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm">emerald-300</div>
                  <div class="bg-emerald-400 h-20 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm">emerald-400</div>
                  <div class="bg-emerald-500 h-20 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm">emerald-500</div>
                  <div class="bg-emerald-600 h-20 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm">emerald-600</div>
                </div>
              </div>

              <!-- Gradients -->
              <div class="mb-6">
                <h3 class="text-base font-semibold text-gray-700 mb-3">Gradient Examples</h3>
                <div class="space-y-3">
                  <div class="bg-gradient-to-r from-green-600 to-emerald-600 h-16 rounded-lg flex items-center justify-center text-white font-semibold">
                    from-green-600 to-emerald-600
                  </div>
                  <div class="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 h-16 rounded-lg flex items-center justify-center text-gray-700 font-semibold border">
                    from-emerald-50 via-teal-50 to-green-100
                  </div>
                  <div class="bg-gradient-to-r from-green-50 to-emerald-50 h-16 rounded-lg flex items-center justify-center text-gray-700 font-semibold border">
                    from-green-50 to-emerald-50
                  </div>
                </div>
              </div>

              <!-- Status Colors -->
              <div>
                <h3 class="text-base font-semibold text-gray-700 mb-3">Status Colors</h3>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div class="bg-blue-500 h-16 rounded-lg flex items-center justify-center text-white font-semibold">Info (blue-500)</div>
                  <div class="bg-amber-500 h-16 rounded-lg flex items-center justify-center text-white font-semibold">Warning (amber-500)</div>
                  <div class="bg-red-500 h-16 rounded-lg flex items-center justify-center text-white font-semibold">Error (red-500)</div>
                  <div class="bg-green-500 h-16 rounded-lg flex items-center justify-center text-white font-semibold">Success (green-500)</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Typography Tab -->
          <div v-if="activeTab === 'typography'" class="space-y-8">
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Typography System</h2>
              
              <!-- Headings -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Headings</h3>
                <div class="space-y-4">
                  <h1 class="text-3xl font-bold text-gray-800">text-3xl font-bold - Main Heading</h1>
                  <h2 class="text-2xl font-bold text-gray-800">text-2xl font-bold - Section Heading</h2>
                  <h3 class="text-xl font-bold text-gray-800">text-xl font-bold - Subsection</h3>
                  <h4 class="text-lg font-bold text-gray-800">text-lg font-bold - Card Title</h4>
                  <h5 class="text-base font-semibold text-gray-700">text-base font-semibold - Label</h5>
                  <h6 class="text-xs font-semibold text-gray-700">text-xs font-semibold - Small Label</h6>
                </div>
              </div>

              <!-- Body Text -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Body Text</h3>
                <div class="space-y-3">
                  <p class="text-base text-gray-600">text-base text-gray-600 - Regular body text for descriptions and content.</p>
                  <p class="text-sm text-gray-600">text-sm text-gray-600 - Small body text for secondary information.</p>
                  <p class="text-xs text-gray-500">text-xs text-gray-500 - Helper text and form descriptions.</p>
                </div>
              </div>

              <!-- Special Text Effects -->
              <div>
                <h3 class="text-base font-semibold text-gray-700 mb-4">Special Effects</h3>
                <div class="space-y-4">
                  <p class="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Gradient Text Effect
                  </p>
                  <p class="text-lg font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent bg-gray-800 p-3 rounded">
                    White Gradient on Dark Background
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Buttons & Forms Tab -->
          <div v-if="activeTab === 'buttons'" class="space-y-8">
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Interactive Elements</h2>
              
              <!-- Buttons -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Button Styles</h3>
                <div class="space-y-4">
                  <div class="flex flex-wrap gap-3">
                    <button class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 px-4 text-sm rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50">
                      Primary Button
                    </button>
                    <button class="px-4 py-2 text-sm border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 font-semibold">
                      Secondary Button
                    </button>
                    <button @click="showToastDemo" class="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300">
                      Show Toast Demo
                    </button>
                    <button disabled class="bg-gray-400 cursor-not-allowed text-white py-2 px-4 text-sm rounded-lg font-semibold">
                      Disabled Button
                    </button>
                  </div>
                </div>
              </div>

              <!-- Form Elements -->
              <div>
                <h3 class="text-base font-semibold text-gray-700 mb-4">Form Controls</h3>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-2">Text Input</label>
                      <input type="text" placeholder="Enter text here" 
                            class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-2">Select Dropdown</label>
                      <select class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300">
                        <option>Choose an option</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </select>
                    </div>
                  </div>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-2">Email Input</label>
                      <div class="relative">
                        <input type="email" placeholder="your@email.com" 
                              class="w-full px-3 py-2 pr-10 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300" />
                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-2">Textarea</label>
                      <textarea rows="3" placeholder="Enter longer text here..." 
                                class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 resize-none"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cards & Layouts Tab -->
          <div v-if="activeTab === 'cards'" class="space-y-8">
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Card Designs</h2>
              
              <!-- Basic Cards -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Basic Card Styles</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <!-- Simple Card -->
                  <div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Simple Card</h4>
                    <p class="text-sm text-gray-600 mb-4">Basic card with border and hover shadow effect.</p>
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-500">Basic styling</span>
                      <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <!-- Elevated Card -->
                  <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Elevated Card</h4>
                    <p class="text-sm text-gray-600">Card with shadow and lift effect on hover.</p>
                  </div>

                  <!-- Glass Card -->
                  <div class="bg-white/80 backdrop-blur-md rounded-xl border border-white/30 p-6 hover:bg-white/90 transition-all duration-300">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z"/>
                      </svg>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Glass Morphism</h4>
                    <p class="text-sm text-gray-600">Glassmorphism effect with backdrop blur.</p>
                  </div>
                </div>
              </div>

              <!-- Feature Cards -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Feature Cards</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Pricing Card -->
                  <div class="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-400 to-transparent opacity-20"></div>
                    <div class="p-6">
                      <div class="flex items-center justify-between mb-4">
                        <h4 class="text-lg font-bold text-gray-800">Premium Plan</h4>
                        <span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">Popular</span>
                      </div>
                      <div class="mb-4">
                        <span class="text-3xl font-bold text-gray-800">$29</span>
                        <span class="text-gray-500">/month</span>
                      </div>
                      <ul class="space-y-2 mb-6">
                        <li class="flex items-center text-sm text-gray-600">
                          <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          Unlimited projects
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                          <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          Priority support
                        </li>
                        <li class="flex items-center text-sm text-gray-600">
                          <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          Advanced analytics
                        </li>
                      </ul>
                      <button class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
                        Get Started
                      </button>
                    </div>
                  </div>

                  <!-- Profile Card -->
                  <div class="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 text-white relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-y-12 translate-x-12"></div>
                    <div class="relative z-10">
                      <div class="flex items-center mb-4">
                        <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 class="text-lg font-bold">John Doe</h4>
                          <p class="text-green-100 text-sm">Senior Developer</p>
                        </div>
                      </div>
                      <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p class="text-2xl font-bold">127</p>
                          <p class="text-green-100 text-xs">Projects</p>
                        </div>
                        <div>
                          <p class="text-2xl font-bold">89%</p>
                          <p class="text-green-100 text-xs">Success</p>
                        </div>
                        <div>
                          <p class="text-2xl font-bold">4.9</p>
                          <p class="text-green-100 text-xs">Rating</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step Cards -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Step Indicator Cards</h3>
                <div class="space-y-3">
                  <div class="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <div>
                        <h4 class="font-semibold text-gray-800 text-sm mb-0.5">Personal Information</h4>
                        <p class="text-xs text-gray-600">Tell us about yourself</p>
                      </div>
                    </div>
                  </div>
                  <div class="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                      <div>
                        <h4 class="font-semibold text-gray-800 text-sm mb-0.5">Account Setup</h4>
                        <p class="text-xs text-gray-600">Create your login credentials</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Stats Cards -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Statistics Cards</h3>
                <div class="grid grid-cols-3 gap-4">
                  <div class="text-center group">
                    <div class="bg-white bg-opacity-10 rounded-lg p-4 mb-2 backdrop-blur-sm group-hover:bg-opacity-20 transition-all duration-300 border">
                      <p class="text-2xl font-bold text-green-600 mb-1">10k+</p>
                      <p class="text-xs text-gray-600 font-medium tracking-wider">USERS</p>
                    </div>
                  </div>
                  <div class="text-center group">
                    <div class="bg-white bg-opacity-10 rounded-lg p-4 mb-2 backdrop-blur-sm group-hover:bg-opacity-20 transition-all duration-300 border">
                      <p class="text-2xl font-bold text-green-600 mb-1">50k+</p>
                      <p class="text-xs text-gray-600 font-medium tracking-wider">DEALS</p>
                    </div>
                  </div>
                  <div class="text-center group">
                    <div class="bg-white bg-opacity-10 rounded-lg p-4 mb-2 backdrop-blur-sm group-hover:bg-opacity-20 transition-all duration-300 border">
                      <p class="text-2xl font-bold text-green-600 mb-1">24/7</p>
                      <p class="text-xs text-gray-600 font-medium tracking-wider">SUPPORT</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tables Tab -->
          <div v-if="activeTab === 'tables'" class="space-y-8">
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Table Designs</h2>
              
              <!-- Basic Table -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Basic Table</h3>
                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                        </td>
                      </tr>
                      <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane@example.com</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">User</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                        </td>
                      </tr>
                      <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mike Johnson</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">mike@example.com</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Moderator</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Inactive</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Enhanced Table with Actions -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Enhanced Table with Actions</h3>
                <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div class="flex items-center justify-between">
                      <h4 class="text-lg font-semibold text-gray-800">User Management</h4>
                      <button class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
                        Add User
                      </button>
                    </div>
                  </div>
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input type="checkbox" class="rounded border-gray-300 text-green-600 focus:ring-green-500">
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <input type="checkbox" class="rounded border-gray-300 text-green-600 focus:ring-green-500">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                              <span class="text-white font-semibold text-sm">JD</span>
                            </div>
                            <div>
                              <div class="text-sm font-medium text-gray-900">John Doe</div>
                              <div class="text-sm text-gray-500">john.doe@company.com</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Engineering</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            <div class="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                            Online
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div class="flex items-center justify-end space-x-2">
                            <button class="text-indigo-600 hover:text-indigo-900 transition-colors duration-200">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button class="text-red-600 hover:text-red-900 transition-colors duration-200">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <input type="checkbox" class="rounded border-gray-300 text-green-600 focus:ring-green-500">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3">
                              <span class="text-white font-semibold text-sm">JS</span>
                            </div>
                            <div>
                              <div class="text-sm font-medium text-gray-900">Jane Smith</div>
                              <div class="text-sm text-gray-500">jane.smith@company.com</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Marketing</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 day ago</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            <div class="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                            Offline
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div class="flex items-center justify-end space-x-2">
                            <button class="text-indigo-600 hover:text-indigo-900 transition-colors duration-200">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button class="text-red-600 hover:text-red-900 transition-colors duration-200">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Data Table with Sorting -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Sortable Data Table</h3>
                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table class="w-full">
                    <thead class="bg-gradient-to-r from-green-50 to-emerald-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-green-100 transition-colors duration-200">
                          <div class="flex items-center">
                            Product Name
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                          </div>
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-green-100 transition-colors duration-200">
                          <div class="flex items-center">
                            Category
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                          </div>
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-green-100 transition-colors duration-200">
                          <div class="flex items-center">
                            Price
                            <svg class="w-4 h-4 ml-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                            </svg>
                          </div>
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mr-3"></div>
                            <div>
                              <div class="text-sm font-medium text-gray-900">MacBook Pro</div>
                              <div class="text-sm text-gray-500">13-inch, M1 chip</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electronics</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">$1,299</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">In Stock</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="flex items-center">
                              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span class="text-sm text-gray-600 ml-1">4.8</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mr-3"></div>
                            <div>
                              <div class="text-sm font-medium text-gray-900">iPhone 13</div>
                              <div class="text-sm text-gray-500">128GB, Blue</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electronics</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">$799</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Low Stock</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="flex items-center">
                              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span class="text-sm text-gray-600 ml-1">4.6</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Compact Table -->
              <div>
                <h3 class="text-base font-semibold text-gray-700 mb-4">Compact Table</h3>
                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-100">
                      <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">#001</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Update homepage design</td>
                        <td class="px-4 py-2 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">High</span>
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Today</td>
                        <td class="px-4 py-2 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">In Progress</span>
                        </td>
                      </tr>
                      <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">#002</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Fix mobile responsive issues</td>
                        <td class="px-4 py-2 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">Medium</span>
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Tomorrow</td>
                        <td class="px-4 py-2 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">Todo</span>
                        </td>
                      </tr>
                      <tr class="hover:bg-gray-50 transition-colors duration-200">
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">#003</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Setup testing environment</td>
                        <td class="px-4 py-2 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">Low</span>
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Next Week</td>
                        <td class="px-4 py-2 whitespace-nowrap">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">Done</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Animations Tab -->
          <div v-if="activeTab === 'animations'" class="space-y-8">
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Animations & Effects</h2>
              
              <!-- Animation Examples -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">CSS Animations</h3>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div class="text-center">
                    <div class="w-16 h-16 bg-green-400 rounded-full mx-auto mb-2 animate-bounce"></div>
                    <p class="text-xs font-semibold text-gray-600">animate-bounce</p>
                  </div>
                  <div class="text-center">
                    <div class="w-16 h-16 bg-emerald-400 rounded-full mx-auto mb-2 animate-pulse"></div>
                    <p class="text-xs font-semibold text-gray-600">animate-pulse</p>
                  </div>
                  <div class="text-center">
                    <div class="w-16 h-16 bg-teal-400 rounded-full mx-auto mb-2 animate-ping"></div>
                    <p class="text-xs font-semibold text-gray-600">animate-ping</p>
                  </div>
                  <div class="text-center">
                    <div class="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 animate-spin"></div>
                    <p class="text-xs font-semibold text-gray-600">animate-spin</p>
                  </div>
                </div>
              </div>

              <!-- Hover Effects -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Hover Effects</h3>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div class="group bg-white p-6 rounded-lg border hover:shadow-lg transition-all duration-300">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                      <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                    </div>
                    <h4 class="font-semibold text-gray-800 mb-1">Scale on Hover</h4>
                    <p class="text-xs text-gray-600">group-hover:scale-110</p>
                  </div>
                  <div class="bg-white p-6 rounded-lg border hover:bg-gray-50 transition-colors duration-300">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <h4 class="font-semibold text-gray-800 mb-1">Background Change</h4>
                    <p class="text-xs text-gray-600">hover:bg-gray-50</p>
                  </div>
                  <div class="bg-white p-6 rounded-lg border hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <h4 class="font-semibold text-gray-800 mb-1">Lift & Shadow</h4>
                    <p class="text-xs text-gray-600">hover:-translate-y-1</p>
                  </div>
                </div>
              </div>

              <!-- Transition Durations -->
              <div>
                <h3 class="text-base font-semibold text-gray-700 mb-4">Transition Durations</h3>
                <div class="space-y-3">
                  <div class="bg-white p-4 rounded-lg border hover:bg-green-50 transition-all duration-150">
                    <p class="text-sm font-semibold">Fast (150ms) - duration-150</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg border hover:bg-green-50 transition-all duration-300">
                    <p class="text-sm font-semibold">Medium (300ms) - duration-300</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg border hover:bg-green-50 transition-all duration-500">
                    <p class="text-sm font-semibold">Slow (500ms) - duration-500</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Components Tab -->
          <div v-if="activeTab === 'components'" class="space-y-8">
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Complex Components</h2>
              
              <!-- Progress Indicator -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Progress Indicator</h3>
                <div class="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm border">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="text-base font-semibold text-gray-800">Registration Progress</h4>
                    <span class="text-sm text-gray-600">Step {{ currentStep }} of 3</span>
                  </div>
                  
                  <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div class="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                        :style="`width: ${(currentStep / 3) * 100}%`">
                    </div>
                  </div>
                  
                  <div class="flex justify-between text-sm">
                    <span :class="{ 'text-green-600 font-medium': currentStep >= 1, 'text-gray-500': currentStep < 1 }">Basic Info</span>
                    <span :class="{ 'text-green-600 font-medium': currentStep >= 2, 'text-gray-500': currentStep < 2 }">Account</span>
                    <span :class="{ 'text-green-600 font-medium': currentStep >= 3, 'text-gray-500': currentStep < 3 }">Verify</span>
                  </div>
                  
                  <div class="flex gap-2 mt-4">
                    <button @click="currentStep = Math.max(1, currentStep - 1)" 
                            class="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200">
                      Previous
                    </button>
                    <button @click="currentStep = Math.min(3, currentStep + 1)" 
                            class="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200">
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <!-- Verification Code Input -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Verification Code Input</h3>
                <div class="bg-white p-6 rounded-lg border">
                  <label class="block text-sm font-semibold text-gray-700 mb-3 text-center">Enter 6-Digit Code</label>
                  <div class="flex justify-center space-x-2 mb-4">
                    <input v-for="n in 6" 
                          :key="n" 
                          v-model="verificationCode[n - 1]" 
                          type="text" 
                          maxlength="1"
                          class="w-12 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 bg-gray-50/50 hover:border-gray-300 shadow-sm" />
                  </div>
                  <p class="text-xs text-gray-500 text-center">Demo: Some digits are pre-filled</p>
                </div>
              </div>

              <!-- Feature List -->
              <div class="mb-8">
                <h3 class="text-base font-semibold text-gray-700 mb-4">Feature List with Icons</h3>
                <div class="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-6 rounded-lg text-white">
                  <h4 class="text-lg font-semibold mb-4 flex items-center">
                    <span class="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></span>
                    Why Choose Us?
                  </h4>
                  
                  <ul class="space-y-3">
                    <li v-for="(feature, index) in features" :key="index" class="flex items-start group">
                      <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <span class="text-green-50 text-sm">{{ feature }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Toast Notification Variants -->
              <div>
                <h3 class="text-base font-semibold text-gray-700 mb-4">Toast Notification Variants</h3>
                <div class="space-y-4">
                  <!-- Info Toast -->
                  <div class="max-w-sm bg-white rounded-lg shadow-lg border-l-4 border-blue-400 p-4">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3 flex-1">
                        <h4 class="text-sm font-semibold text-gray-900 mb-1">Information</h4>
                        <div class="text-sm text-gray-700">This is an info toast notification.</div>
                      </div>
                    </div>
                  </div>

                  <!-- Warning Toast -->
                  <div class="max-w-sm bg-white rounded-lg shadow-lg border-l-4 border-amber-400 p-4">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3 flex-1">
                        <h4 class="text-sm font-semibold text-gray-900 mb-1">Warning</h4>
                        <div class="text-sm text-gray-700">This is a warning toast notification.</div>
                      </div>
                    </div>
                  </div>

                  <!-- Success Toast -->
                  <div class="max-w-sm bg-white rounded-lg shadow-lg border-l-4 border-green-400 p-4">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3 flex-1">
                        <h4 class="text-sm font-semibold text-gray-900 mb-1">Success</h4>
                        <div class="text-sm text-gray-700">This is a success toast notification.</div>
                      </div>
                    </div>
                  </div>

                  <!-- Error Toast -->
                  <div class="max-w-sm bg-white rounded-lg shadow-lg border-l-4 border-red-400 p-4">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3 flex-1">
                        <h4 class="text-sm font-semibold text-gray-900 mb-1">Error</h4>
                        <div class="text-sm text-gray-700">This is an error toast notification.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue'

  const activeTab = ref('colors')
  const showToast = ref(false)
  const currentStep = ref(2)
  const verificationCode = ref(['1', '2', '3', '', '', ''])

  const tabs = [
    { id: 'colors', label: 'Colors & Gradients' },
    { id: 'typography', label: 'Typography' },
    { id: 'buttons', label: 'Buttons & Forms' },
    { id: 'cards', label: 'Cards & Layouts' },
    { id: 'tables', label: 'Tables' },
    { id: 'animations', label: 'Animations & Effects' },
    { id: 'components', label: 'Components' }
  ]

  const features = [
    'Trusted by verified members',
    'Fast & secure transactions',
    '24/7 expert support',
    'Modern farming insights'
  ]

  const showToastDemo = () => {
    showToast.value = true
    setTimeout(() => showToast.value = false, 3000)
  }
  </script>