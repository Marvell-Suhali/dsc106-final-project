
const scroller = scrollama();

const stepElements = d3.selectAll('.step');
const dots = d3.select("#scatter").selectAll(".dot");

function handleStepEnter(response) {
  
  stepElements.classed('is-active', function (d, i) {
    return i === response.index;
  });

  const stepIndex = response.index + 1; 

  if (stepIndex === 1) {
    // baseline
    dots.transition().duration(800)
      .style("opacity", 0.7)
      .attr("fill", d => color(d.energy))
      .attr("r", 5);
  } 
  
  else if (stepIndex === 2) {
    dots.transition().duration(800)
      .style("opacity", d => d.energy > 0.8 ? 1 : 0.1) 
      .attr("fill", d => d.energy > 0.8 ? "#ccff00" : "#444")
      .attr("r", d => d.energy > 0.8 ? 7 : 3); 
  } 
  
  else if (stepIndex === 3) {
    dots.transition().duration(800)
      .style("opacity", d => d.energy < 0.3 ? 1 : 0.05)
      .attr("fill", d => d.energy < 0.3 ? "#1DB954" : "#222")
      .attr("r", d => d.energy < 0.3 ? 8 : 2);
  }
}

// scrollama event listeners
function initScrolly() {
  scroller
    .setup({
      step: '#scrolly article .step',
      offset: 0.5, 
      debug: false 
    })
    .onStepEnter(handleStepEnter);

  window.addEventListener('resize', scroller.resize);
}

const tooltip = d3.select("#tooltip");

  const dots = svg.selectAll(".dot-scrolly").data(SCATTER_DATA).enter().append("circle")
    .attr("class","dot-scrolly").attr("r", 4)
    .attr("cx", d=>x(d.danceability)).attr("cy", d=>y(d.popularity))
    .attr("fill", d=>colorScale(d.energy)).attr("stroke", "#0f0f0f").attr("stroke-width", "0.5")
    .style("transition", "r 0.5s ease, opacity 0.5s ease, fill 0.5s ease")
    .style("cursor", "crosshair") 
    
    .on("mousemove", function(event, d) {
      tooltip.style("opacity", 1) 
        .style("left", (event.clientX + 14) + "px") 
        .style("top", (event.clientY - 28) + "px")
        
        .html(`
          <strong>${d.track_name}</strong><br>
          <span style="color:#aaa">${d.artists}</span><br><br>
          <span style="color:#888">Genre:</span> <span style="color:#fff">${d.track_genre}</span><br>
          <span style="color:#888">Popularity:</span> <span style="color:#1DB954; font-weight:bold;">${d.popularity}</span><br>
          <span style="color:#888">Danceability:</span> <span style="color:#fff">${d.danceability}</span><br>
          <span style="color:#888">Energy:</span> <span style="color:#fff">${d.energy}</span>
        `);
        
      d3.select(this).attr("stroke", "#1DB954").attr("stroke-width", "2");
    })
    
    .on("mouseleave", function() {
      tooltip.style("opacity", 0); 
      d3.select(this).attr("stroke", "#0f0f0f").attr("stroke-width", "0.5"); // Reset dot border
    });

initScrolly();