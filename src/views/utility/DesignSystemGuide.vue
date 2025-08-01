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
    <div class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto border border-white/30">
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
        <div class="flex space-x-8 px-6">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300',
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
            <h2 class="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Cards & Layouts</h2>
            
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

            <!-- Glass Morphism Card -->
            <div>
              <h3 class="text-base font-semibold text-gray-700 mb-4">Glass Morphism Effect</h3>
              <div class="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/30">
                <h4 class="text-lg font-bold text-gray-800 mb-2">Glassmorphism Card</h4>
                <p class="text-sm text-gray-600 mb-4">This card demonstrates the glass morphism effect with backdrop blur and semi-transparent background.</p>
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-green-500 rounded-full"></div>
                  <div class="w-8 h-8 bg-emerald-500 rounded-full"></div>
                  <div class="w-8 h-8 bg-teal-500 rounded-full"></div>
                </div>
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