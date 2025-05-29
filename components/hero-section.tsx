"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threeContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // p5.js particle animation
    let p5Instance: any = null

    const loadP5 = async () => {
      const p5 = (await import("p5")).default

      const sketch = (p: any) => {
        const particles: any[] = []
        const numParticles = 100

        p.setup = () => {
          const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
          canvas.parent(canvasRef.current)

          for (let i = 0; i < numParticles; i++) {
            particles.push({
              x: p.random(p.width),
              y: p.random(p.height),
              vx: p.random(-1, 1),
              vy: p.random(-1, 1),
              size: p.random(2, 6),
              alpha: p.random(0.3, 0.8),
            })
          }
        }

        p.draw = () => {
          p.clear()

          // Update and draw particles
          for (const particle of particles) {
            particle.x += particle.vx
            particle.y += particle.vy

            if (particle.x < 0 || particle.x > p.width) particle.vx *= -1
            if (particle.y < 0 || particle.y > p.height) particle.vy *= -1

            p.fill(7, 190, 184, particle.alpha * 255)
            p.noStroke()
            p.ellipse(particle.x, particle.y, particle.size)

            // Connect nearby particles
            for (const other of particles) {
              const distance = p.dist(particle.x, particle.y, other.x, other.y)
              if (distance < 100) {
                p.stroke(7, 190, 184, (1 - distance / 100) * 50)
                p.strokeWeight(1)
                p.line(particle.x, particle.y, other.x, other.y)
              }
            }
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight)
        }
      }

      p5Instance = new p5(sketch)
    }

    loadP5()

    // Three.js 3D animation
    const loadThree = async () => {
      const THREE = await import("three")

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

      renderer.setSize(400, 400)
      renderer.setClearColor(0x000000, 0)
      threeContainerRef.current?.appendChild(renderer.domElement)

      // Create glowing orb
      const geometry = new THREE.SphereGeometry(1, 32, 32)
      const material = new THREE.MeshBasicMaterial({
        color: 0x07beb8,
        transparent: true,
        opacity: 0.8,
      })
      const sphere = new THREE.Mesh(geometry, material)
      scene.add(sphere)

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x3dccc7,
        transparent: true,
        opacity: 0.3,
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      scene.add(glow)

      camera.position.z = 3

      const animate = () => {
        requestAnimationFrame(animate)

        sphere.rotation.x += 0.01
        sphere.rotation.y += 0.01
        glow.rotation.x -= 0.005
        glow.rotation.y -= 0.005

        renderer.render(scene, camera)
      }

      animate()
    }

    loadThree()

    return () => {
      if (p5Instance) {
        p5Instance.remove()
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* p5.js Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: 1 }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Cipherlix
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Empowering the Future with Software Solutions
            </p>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Let's Build Together
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Three.js Container */}
          <div className="flex justify-center lg:justify-end">
            <div ref={threeContainerRef} className="w-96 h-96 flex items-center justify-center" />
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-light-surface/20 to-light-highlight/30 dark:from-transparent dark:via-dark-secondary/20 dark:to-dark-tertiary/30 pointer-events-none"
        style={{ zIndex: 2 }}
      />
    </section>
  )
}
