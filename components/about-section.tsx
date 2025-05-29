"use client"

import { useEffect, useRef } from "react"
import { Target, Shield, Zap } from "lucide-react"

export default function AboutSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const loadP5 = async () => {
      const p5 = (await import("p5")).default

      const sketch = (p: any) => {
        let time = 0

        p.setup = () => {
          const canvas = p.createCanvas(400, 400)
          canvas.parent(canvasRef.current)
        }

        p.draw = () => {
          p.clear()

          // Animated blob
          p.fill(7, 190, 184, 100)
          p.noStroke()

          p.beginShape()
          for (let angle = 0; angle < p.TWO_PI; angle += 0.1) {
            const radius = 80 + 30 * p.sin(angle * 3 + time) + 20 * p.cos(angle * 5 + time * 1.5)
            const x = p.width / 2 + radius * p.cos(angle)
            const y = p.height / 2 + radius * p.sin(angle)
            p.vertex(x, y)
          }
          p.endShape(p.CLOSE)

          time += 0.02
        }
      }

      new p5(sketch)
    }

    loadP5()
  }, [])

  return (
    <section id="about" className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Cipherlix
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We are a forward-thinking software company dedicated to creating innovative solutions that drive digital
            transformation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4 group">
              <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Pushing boundaries with cutting-edge technology and creative problem-solving approaches.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Trust</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Building reliable, secure solutions that our clients can depend on for their critical operations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 group">
              <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Performance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Delivering high-performance solutions optimized for speed, scalability, and efficiency.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <canvas ref={canvasRef} className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
