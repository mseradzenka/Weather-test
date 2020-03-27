import { timeLocale } from '../../consts/locale.const';
import * as d3 from 'd3';
import { WeatherData } from '../../interfaces/weather.interfaces';
import { ElementRef } from '@angular/core';

export class BaseChart {
    public createChart(chartContainer: ElementRef, chartData: WeatherData[], measuredItem: string): void {
        const isTemperature = () => measuredItem === 'temp';
        const locale = d3.timeFormatLocale(timeLocale);
        d3.select(`svg#${measuredItem}`).remove();
        const element = chartContainer.nativeElement;
        const data = chartData;
        const getXTicks = () => chartData.length < 30 ? chartData.length : 30;
        const xValue = d => new Date(d.time);
        const xLabel = 'Time';
        const yValue = d => Number(d[measuredItem]);
        const yLabel = isTemperature() ? 'Temperature °C' : 'Humidity, %';
        const margin = { left: 120, right: 30, top: 20, bottom: 120 };

        const svg = d3.select(element).append('svg').attr('id', measuredItem);
        const width = element.offsetWidth - margin.left - margin.right;
        const height = 350;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        svg.attr('height', `${height}px`);
        svg.attr('width', `${width}px`);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        const xAxisG = g.append('g')
            .attr('transform', `translate(0, ${innerHeight})`);
        const yAxisG = g.append('g');

        xAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('x', innerWidth / 2)
            .attr('y', 100)
            .text(xLabel);

        yAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('x', -innerHeight / 2)
            .attr('y', -60)
            .attr('transform', `rotate(-90)`)
            .style('text-anchor', 'middle')
            .text(yLabel);

        const xScale = d3.scaleTime();
        const yScale = d3.scaleLinear();

        const xAxis = d3.axisBottom()
            .scale(xScale)
            .tickPadding(15)
            .ticks(getXTicks())
            .tickSize(-innerHeight)
            .tickFormat(date => locale.format('%H:%M:%S')(date));

        const yTicks = 5;
        const yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(yTicks)
            .tickPadding(15)
            .tickSize(-innerWidth);

        const line = d3.line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(d3.curveBasis);

        xScale
            .domain(d3.extent(data, xValue))
            .range([0, innerWidth]);

        yScale
            .domain(d3.extent(data, yValue))
            .range([innerHeight, 0])
            .nice(yTicks);

        g.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 4)
            .attr('d', line(data));

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
    }
}
