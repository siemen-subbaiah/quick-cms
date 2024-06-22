'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { notFound } from 'next/navigation';
import { useTheme } from 'next-themes';

const BarChart = ({
  xAxisLabels,
  series,
}: {
  xAxisLabels: string[];
  series: { name: string; data: number[] }[];
}) => {
  const { resolvedTheme } = useTheme();

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: 85,
      },
    },
    stroke: {
      colors: ['#0A0A0A'],
    },
    xaxis: {
      categories: xAxisLabels,
      labels: {
        style: {
          colors: xAxisLabels.map((val) =>
            resolvedTheme === 'dark' ? '#fafafa' : '020817'
          ),
        },
      },
      title: {
        text: 'Pages',
        style: {
          color: resolvedTheme === 'dark' ? '#fafafa' : '020817',
          fontSize: '12px',
          fontFamily: '"Noto Sans", sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Fields Count',
        style: {
          color: resolvedTheme === 'dark' ? '#fafafa' : '020817',
          fontSize: '12px',
          fontFamily: '"Noto Sans", sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      labels: {
        style: {
          colors: [resolvedTheme === 'dark' ? '#fafafa' : '020817'],
        },
      },
    },
    fill: {
      opacity: 1,
    },
  };

  if (typeof window === 'undefined') {
    return notFound();
  }

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl'>Fields Count</h2>
      </CardHeader>
      <CardContent>
        <Chart options={options} series={series} type='bar' height={350} />
      </CardContent>
    </Card>
  );
};

export default BarChart;
