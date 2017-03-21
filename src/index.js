import * as d3 from 'd3';
import 'styles';
import 'flags';

const url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';

function visualize(data) {
  const margins = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };
  const canvasWidth = window.innerWidth * 0.935;
  const canvasHeight = window.innerHeight * 0.8;
  const width = canvasWidth - margins.right - margins.left;
  const height = canvasHeight - margins.top - margins.bottom;
  const linkDistance = 10;
  const flagHeight = 16;
  const flagWidth = 12;

  const graph = d3.select('#graph');
  const svg = graph.append('svg')
    .attr('class', 'graph')
    .attr('width', canvasWidth)
    .attr('height', canvasHeight);

  const simulation = d3.forceSimulation()
    .nodes(data.nodes);
  const links = d3.forceLink(data.links)
    .distance(linkDistance);

  simulation.force('link', links)
    .force('charge', d3.forceManyBody().distanceMax(100).distanceMin(5))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide().radius(20));

  const dragStarted = () => {
    if (!d3.event.active) {
      simulation.alphaTarget(0.3).restart();
    }
  };
  const dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };
  const dragEnded = (d) => {
    if (!d3.event.active) {
      simulation.alphaTarget(0);
    }
    d.fx = undefined;
    d.fy = undefined;
  };

  const flags = graph.append('div')
    .attr('class', 'flags');

  const relativeTop = y => Math.max(0, Math.min(height, y));
  const relativeLeft = x => Math.max(0, Math.min(width, x));

  const tooltip = d3.select('body')
    .append('div')
      .attr('class', 'tooltip');

  const translateTooltip = e => (
    `translate(calc(${e.pageX}px - 50%), calc(${e.pageY}px - 150%))`
  );

  const node = flags.selectAll('.node')
    .data(simulation.nodes(), d => d.code)
    .enter()
    .append('img')
      .attr('width', flagWidth)
      .attr('height', flagHeight)
      .attr('class', d => `flag-icon flag-icon-${d.code}`)
      .on('mouseover', (d) => {
        tooltip.text(d.country)
          .attr('class', 'tooltip tooltip--is-visible')
          .style('transform', translateTooltip(d3.event));
      })
      .on('mouseout', () => {
        tooltip.attr('class', 'tooltip');
      })
      .call(d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded));

  const link = svg.selectAll('.link')
    .data(links.links())
    .enter()
    .append('line')
      .attr('class', 'link');

  simulation.on('tick', () => {
    node.style('transform', d => (
      `translate(${relativeLeft(d.x - (flagWidth / 2))}px,
        ${relativeTop(d.y - (flagHeight / 2))}px)`)
    );
    link
      .attr('x1', d => `${relativeLeft(d.source.x)}px`)
      .attr('y1', d => `${relativeTop(d.source.y)}px`)
      .attr('x2', d => `${relativeLeft(d.target.x)}px`)
      .attr('y2', d => `${relativeTop(d.target.y)}px`);
  });
}

d3.json(url, (err, data) => {
  if (err) throw err;
  visualize(data);
});
