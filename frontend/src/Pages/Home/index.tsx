import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const DashboardCharts: React.FC = () => {
  const pieInventoryRef = useRef<HTMLCanvasElement>(null);
  const pieUserAdminRef = useRef<HTMLCanvasElement>(null);
  const barRevenueRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (pieInventoryRef.current) {
      new Chart(pieInventoryRef.current, {
        type: 'pie',
        data: {
          labels: ['Tồn kho', 'Đã xuất'],
          datasets: [{
            data: [70, 30],
            backgroundColor: ['#FE881C', '#FDCE1C'],
            borderWidth: 0,
          }]
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 20,
                font: { size: 12 },
                color: '#0f172a',
              }
            },
            tooltip: { enabled: false }
          },
          animation: {
            animateRotate: true,
            animateScale: true
          }
        },
        plugins: [{
          id: 'labels',
          afterDraw(chart) {
            const { ctx } = chart;
            if (!ctx) return;
            ctx.save();
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const meta = chart.getDatasetMeta(0).data;
            if (meta.length > 1) {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillText('Tồn kho 70%', meta[0].x - 40, meta[0].y);
              ctx.fillStyle = '#FFFFF';
              ctx.fillText('Đã xuất 30%', meta[1].x + 40, meta[1].y);
            }
            ctx.restore();
          }
        }]
      });
    }

    if (pieUserAdminRef.current) {
      new Chart(pieUserAdminRef.current, {
        type: 'pie',
        data: {
          labels: ['User', 'Admin'],
          datasets: [{
            data: [80, 20],
            backgroundColor: ['#FE881C', '#FDC600'],
            borderWidth: 0,
          }]
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 20,
                font: { size: 12 },
                color: '#0f172a',
              }
            },
            tooltip: { enabled: false }
          },
          animation: {
            animateRotate: true,
            animateScale: true
          }
        },
        plugins: [{
          id: 'labels',
          afterDraw(chart) {
            const { ctx } = chart;
            if (!ctx) return;
            ctx.save();
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const meta = chart.getDatasetMeta(0).data;
            if (meta.length > 1) {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillText('User 80%', meta[0].x - 40, meta[0].y);
              ctx.fillStyle = '#FFFFF';
              ctx.fillText('Admin 20%', meta[1].x + 40, meta[1].y);
            }
            ctx.restore();
          }
        }]
      });
    }

    if (barRevenueRef.current) {
      new Chart(barRevenueRef.current, {
        type: 'bar',
        data: {
          labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
          datasets: [{
            label: '',
            data: [4000, 3000, 5000, 2800, 7000, 3200],
            backgroundColor: '#8b93e6',
            borderRadius: 4,
            barPercentage: 0.6,
            categoryPercentage: 0.6,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 8000,
              ticks: {
                stepSize: 2000,
                color: '#6b7280',
                font: { size: 12 }
              },
              grid: {
                color: '#e5e7eb',
                drawTicks: false
              },
              border: {
                display: true,
                color: '#e5e7eb'
              }
            },
            x: {
              ticks: {
                color: '#6b7280',
                font: { size: 12 }
              },
              grid: {
                display: false,
                drawTicks: false
              },
              border: {
                display: true,
                color: '#e5e7eb'
              }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          }
        }
      });
    }
  }, []);

  return (
    <div className="bg-white p-4 font-sans max-w-7xl mx-auto">
      <h2 className="font-bold text-base mb-4">Dashboard Thống Kê</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { title: 'Số phiếu xuất kho', value: 156, bg: 'bg-blue-200', text: 'text-blue-700' },
          { title: 'Số phiếu nhập kho', value: 89, bg: 'bg-green-200', text: 'text-green-700' },
          { title: 'Tổng giá trị đơn hàng', value: '2.5T', bg: 'bg-purple-200', text: 'text-purple-700' },
        ].map(({ title, value, bg, text }, idx) => (
          <div key={idx} className="flex items-center gap-3 border border-gray-200 rounded-lg p-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${bg} ${text}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l5 5v9a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">{title}</p>
              <p className="font-bold text-lg leading-5">{value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="font-semibold text-sm mb-4">Tỉ lệ tồn kho/xuất kho</p>
          <canvas ref={pieInventoryRef} width={250} height={250}></canvas>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="font-semibold text-sm mb-4">Tỉ lệ User/Admin</p>
          <canvas ref={pieUserAdminRef} width={250} height={250}></canvas>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <p className="font-semibold text-sm mb-4">Doanh Thu Theo Tháng</p>
        <canvas ref={barRevenueRef}></canvas>
      </div>
    </div>
  );
};

export default DashboardCharts;
