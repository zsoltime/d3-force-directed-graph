import * as d3 from 'd3';
import 'styles';

const url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';

function visualize(data) {
  const margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };
  const canvasWidth = window.innerWidth * 0.8;
  const canvasHeight = window.innerHeight * 0.8;
  const width = canvasWidth - margins.right - margins.left;
  const height = canvasHeight - margins.top - margins.bottom;

  // create svg canvas
  const svg = d3.select('#graph')
    .append('svg')
      .attr('class', 'graph')
      .attr('width', canvasWidth)
      .attr('height', canvasHeight)
      .attr('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`);

  const graph = svg.append('g')
    .attr('transform', `translate(${margins.left}, ${margins.top})`);
}

d3.json(url, (err, data) => {
  if (err) throw err;
  visualize(data);
});
