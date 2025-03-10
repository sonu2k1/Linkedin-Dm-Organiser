"use client"

import { useEffect, useRef } from "react"

export function MessageStats() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Sample data
    const data = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales",
          data: [12, 19, 15, 8, 22, 14, 10],
          color: "#ef4444",
        },
        {
          label: "Job Opportunities",
          data: [5, 2, 3, 1, 4, 0, 2],
          color: "#3b82f6",
        },
        {
          label: "Networking",
          data: [3, 5, 2, 4, 6, 2, 3],
          color: "#10b981",
        },
      ],
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Chart dimensions
    const chartWidth = canvas.width - 60
    const chartHeight = canvas.height - 60
    const chartX = 40
    const chartY = 20

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(chartX, chartY)
    ctx.lineTo(chartX, chartY + chartHeight)
    ctx.lineTo(chartX + chartWidth, chartY + chartHeight)
    ctx.strokeStyle = "#9ca3af"
    ctx.stroke()

    // Draw labels
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#6b7280"

    // X-axis labels
    const xStep = chartWidth / (data.labels.length - 1)
    data.labels.forEach((label, i) => {
      const x = chartX + i * xStep
      ctx.fillText(label, x - 10, chartY + chartHeight + 20)
    })

    // Y-axis labels
    const maxValue = Math.max(...data.datasets.flatMap((ds) => ds.data)) + 5
    for (let i = 0; i <= 5; i++) {
      const y = chartY + chartHeight - (i * chartHeight) / 5
      const value = Math.round((i * maxValue) / 5)
      ctx.fillText(value.toString(), chartX - 25, y + 5)

      // Grid lines
      ctx.beginPath()
      ctx.moveTo(chartX, y)
      ctx.lineTo(chartX + chartWidth, y)
      ctx.strokeStyle = "#e5e7eb"
      ctx.stroke()
    }

    // Draw datasets
    data.datasets.forEach((dataset) => {
      ctx.beginPath()
      dataset.data.forEach((value, i) => {
        const x = chartX + i * xStep
        const y = chartY + chartHeight - (value / maxValue) * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.strokeStyle = dataset.color
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw legend
    const legendY = 15
    let legendX = chartX + 100

    data.datasets.forEach((dataset) => {
      // Line
      ctx.beginPath()
      ctx.moveTo(legendX, legendY)
      ctx.lineTo(legendX + 20, legendY)
      ctx.strokeStyle = dataset.color
      ctx.lineWidth = 2
      ctx.stroke()

      // Label
      ctx.fillStyle = "#374151"
      ctx.fillText(dataset.label, legendX + 25, legendY + 4)

      legendX += 150
    })
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

