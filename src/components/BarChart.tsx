'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { notFound } from 'next/navigation';

const BarChart = ({
  xAxisLabels,
  series,
}: {
  xAxisLabels: string[];
  series: { name: string; data: number[] }[];
}) => {
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
          colors: xAxisLabels.map((val) => '#fafafa'),
        },
      },
      title: {
        text: 'Pages',
        style: {
          color: '#fafafa',
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
          color: '#fafafa',
          fontSize: '12px',
          fontFamily: '"Noto Sans", sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      labels: {
        style: {
          colors: ['#fafafa'],
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
        <CardTitle>Fields Count</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart options={options} series={series} type='bar' height={350} />
      </CardContent>
    </Card>
  );
};

export default BarChart;
