import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function StyleGuide() {
  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">VoyageAI Design System</h1>
        <p className="text-gray-600">Complete style guide and component library</p>
      </div>

      {/* Color Palette */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Color Palette</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Primary Colors</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg"></div>
                <div>
                  <div className="font-medium">Blue Primary</div>
                  <div className="text-sm text-gray-600">#2563EB</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-600 rounded-lg"></div>
                <div>
                  <div className="font-medium">Purple Primary</div>
                  <div className="text-sm text-gray-600">#9333EA</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Accent Colors</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-500 rounded-lg"></div>
                <div>
                  <div className="font-medium">Orange Accent</div>
                  <div className="text-sm text-gray-600">#F97316</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-teal-500 rounded-lg"></div>
                <div>
                  <div className="font-medium">Teal Accent</div>
                  <div className="text-sm text-gray-600">#14B8A6</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Neutral Colors</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-800 rounded-lg"></div>
                <div>
                  <div className="font-medium">Gray 800</div>
                  <div className="text-sm text-gray-600">#1F2937</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div>
                  <div className="font-medium">Gray 200</div>
                  <div className="text-sm text-gray-600">#E5E7EB</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Typography</h2>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Heading 1 - Bold 36px</h1>
              <p className="text-gray-600">Used for main page titles and hero sections</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Heading 2 - Semibold 24px</h2>
              <p className="text-gray-600">Used for section headers and card titles</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Heading 3 - Medium 18px</h3>
              <p className="text-gray-600">Used for subsection headers</p>
            </div>
            <div>
              <p className="text-base text-gray-800 mb-2">Body Text - Regular 16px</p>
              <p className="text-gray-600">Used for main content and descriptions</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Small Text - Regular 14px</p>
              <p className="text-gray-600">Used for captions and secondary information</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Buttons</h2>

        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Primary Buttons</h3>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Gradient Primary</Button>
                <Button className="w-full">Solid Primary</Button>
                <Button size="sm" className="w-full">
                  Small Primary
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Secondary Buttons</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full bg-white text-gray-700">
                  Outline Button
                </Button>
                <Button variant="ghost" className="w-full">
                  Ghost Button
                </Button>
                <Button variant="secondary" className="w-full">
                  Secondary Button
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Cards & Components */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Cards & Components</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Standard Card</h3>
            <p className="text-gray-600 mb-4">Default card with subtle shadow and rounded corners</p>
            <div className="flex space-x-2">
              <Badge>Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold text-gray-800 mb-4">Interactive Card</h3>
            <p className="text-gray-600 mb-4">Card with hover effects and cursor pointer</p>
            <div className="flex space-x-2">
              <Badge className="bg-blue-100 text-blue-800">Custom Badge</Badge>
              <Badge className="bg-green-100 text-green-800">Success Badge</Badge>
            </div>
          </Card>
        </div>
      </section>

      {/* Spacing & Layout */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Spacing & Layout</h2>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Spacing Scale</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>xs: 4px (space-x-1, p-1)</div>
                <div>sm: 8px (space-x-2, p-2)</div>
                <div>md: 12px (space-x-3, p-3)</div>
                <div>lg: 16px p-2)</div>
                <div>md: 12px (space-x-3, p-3)</div>
                <div>lg: 16px (space-x-4, p-4)</div>
                <div>xl: 20px (space-x-5, p-5)</div>
                <div>2xl: 24px (space-x-6, p-6)</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Border Radius</h3>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded"></div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg"></div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl"></div>
                <div className="w-12 h-12 bg-blue-100 rounded-2xl"></div>
                <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                rounded, rounded-lg, rounded-xl, rounded-2xl, rounded-full
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Icons & Imagery */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Icons & Imagery</h2>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Icon Style</h3>
              <p className="text-gray-600 mb-4">Using Lucide React icons with consistent sizing and styling</p>
              <div className="flex space-x-4 items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600">🏔️</span>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">🏛️</span>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600">🍜</span>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600">🏖️</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Image Guidelines</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• High-quality, aspirational travel photography</div>
                <div>• Consistent aspect ratios (16:9 for hero, 4:3 for cards)</div>
                <div>• Subtle overlays for text readability</div>
                <div>• Rounded corners matching design system</div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Micro-interactions */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Micro-interactions</h2>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Animation Principles</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Smooth transitions (0.2s ease-in-out)</div>
                <div>• Subtle hover effects on interactive elements</div>
                <div>• Loading states with branded animations</div>
                <div>• Gentle fade-ins for new content</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Interactive Examples</h3>
              <div className="flex space-x-4">
                <Button className="hover:scale-105 transition-transform">Hover Scale</Button>
                <Button variant="outline" className="hover:shadow-md transition-shadow bg-white text-gray-700">
                  Hover Shadow
                </Button>
                <div className="w-12 h-12 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors cursor-pointer"></div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
