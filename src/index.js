import {
  drag,
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  event,
  json,
  mouse,
  select
} from 'd3';
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
  const linkDistance = 1;
  const flagHeight = 16;
  const flagWidth = 12;

  const graph = select('#graph');
  const svg = graph
    .append('svg')
    .attr('class', 'graph')
    .attr('width', canvasWidth)
    .attr('height', canvasHeight);

  const simulation = forceSimulation().nodes(data.nodes);
  const links = forceLink(data.links).distance(linkDistance);

  simulation
    .force('link', links)
    .force(
      'charge',
      forceManyBody()
        .distanceMax(128)
        .distanceMin(32)
    )
    .force('center', forceCenter(width / 2, height / 2))
    .force('collide', forceCollide().radius(1));

  const dragStarted = () => {
    if (!event.active) {
      simulation.alphaTarget(0.3).restart();
    }
  };
  const dragged = (d) => {
    d.fx = event.x;
    d.fy = event.y;
  };
  const dragEnded = (d) => {
    if (!event.active) {
      simulation.alphaTarget(0);
    }
    d.fx = undefined;
    d.fy = undefined;
  };

  const flags = graph.append('div').attr('class', 'flags');

  const relativeTop = y => Math.max(0, Math.min(height, y));
  const relativeLeft = x => Math.max(0, Math.min(width, x));

  const tooltip = select('body')
    .append('div')
    .attr('class', 'tooltip');

  const node = flags
    .selectAll('.node')
    .data(simulation.nodes(), d => d.code)
    .enter()
    .append('img')
    .attr('width', flagWidth)
    .attr('height', flagHeight)
    .attr('class', d => `flag-icon flag-icon-${d.code}`)
    .on('mouseover', (d) => {
      const tooltipX = `calc(${mouse(document.body)[0]}px - 50%)`;
      const tooltipY = `calc(${mouse(document.body)[1]}px - 100%)`;

      tooltip
        .text(d.country)
        .style('transform', `translate(${tooltipX}, ${tooltipY})`)
        .transition()
        .duration(200)
        .style('opacity', 1);
    })
    .on('mouseout', () => {
      tooltip
        .transition()
        .duration(100)
        .style('opacity', 0);
    })
    .call(
      drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded)
    );

  const link = svg
    .selectAll('.link')
    .data(links.links())
    .enter()
    .append('line')
    .attr('class', 'link');

  simulation.on('tick', () => {
    node.style(
      'transform',
      d =>
        `translate(${relativeLeft(d.x - flagWidth / 2)}px,
        ${relativeTop(d.y - flagHeight / 2)}px)`
    );
    link
      .attr('x1', d => `${relativeLeft(d.source.x)}px`)
      .attr('y1', d => `${relativeTop(d.source.y)}px`)
      .attr('x2', d => `${relativeLeft(d.target.x)}px`)
      .attr('y2', d => `${relativeTop(d.target.y)}px`);
  });
}

json(url, (err, data) => {
  if (err) throw err;
  visualize(data);
});
