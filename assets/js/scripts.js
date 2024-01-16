  
 
	$(document).on('click','.bars_icon', function (){
		$('.main_menu').slideToggle();  
		

		return false;
	});
 
	$(document).on('click','.tabs_area ul li a', function (){
		$('.tabs_area ul li a p').removeClass('active');
		$(this).find('p').addClass('active') ;
		var spanVal = $(this).find('span').html() ;

		if(spanVal == 1){
			$('.third_form').fadeIn();
		}else{ 
			$('.third_form').fadeOut();
		}

		return false;
	});

	$(document).on('click','.next_btn', function (){

		var prevRs = $('.tabs_area ul li a p.active').closest('a').find('span').html();
		var prevRss = parseInt(prevRs)  + 1; 

		if(prevRss > 17 ){
			prevRss = 1; 
		}
		
		$('.tabs_area ul li a p').removeClass('active');
		$('.'+prevRss).find('p').addClass('active') ;

		if(prevRss == 1){
			$('.third_form').fadeIn();
		}else{ 
			$('.third_form').fadeOut();
		}
		

		return false;
	});
	$(document).on('click','.prev_btn', function (){  
		
		var prevRs = $('.tabs_area ul li a p.active').closest('a').find('span').html();
		var prevRss = parseInt(prevRs)  - 1; 

		if(prevRss < 1 ){
			prevRss = 1; 
		}
		
		$('.tabs_area ul li a p').removeClass('active');
		$('.'+prevRss).find('p').addClass('active') ;

		if(prevRss == 1){
			$('.third_form').fadeIn();
		}else{ 
			$('.third_form').fadeOut();
		}

		return false;
	});

	


	// pai chart 

	
function sliceSize(dataNum, dataTotal) {
  return (dataNum / dataTotal) * 360;
}

function addSlice(id, sliceSize, pieElement, offset, sliceID, color) {
  $(pieElement).append("<div class='slice "+ sliceID + "'><span></span></div>");
  var offset = offset - 1;
  var sizeRotation = -179 + sliceSize;

  $(id + " ." + sliceID).css({
    "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
  });

  $(id + " ." + sliceID + " span").css({
    "transform"       : "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
    "background-color": color
  });
}

function iterateSlices(id, sliceSize, pieElement, offset, dataCount, sliceCount, color) {
  var
    maxSize = 179,
    sliceID = "s" + dataCount + "-" + sliceCount;

  if( sliceSize <= maxSize ) {
    addSlice(id, sliceSize, pieElement, offset, sliceID, color);
  } else {
    addSlice(id, maxSize, pieElement, offset, sliceID, color);
    iterateSlices(id, sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
  }
}

function createPie(id) {
  var
    listData      = [],
    listTotal     = 0,
    offset        = 0,
    i             = 0,
    pieElement    = id + " .pie-chart__pie"
    dataElement   = id + " .pie-chart__legend"

    color         = [
      "#0C66E1", 
    ];

  color = shuffle( color );

  $(dataElement+" span").each(function() {
    listData.push(Number($(this).html()));
  });

  for(i = 0; i < listData.length; i++) {
    listTotal += listData[i];
  }

  for(i=0; i < listData.length; i++) {
    var size = sliceSize(listData[i], listTotal);
    iterateSlices(id, size, pieElement, offset, i, 0, color[i]);
    $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
    offset += size;
  }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }

    return a;
}

function createPieCharts() {
  createPie('.pieID--micro-skills' );
  createPie('.pieID--categories' );
  createPie('.pieID--operations' );
}

createPieCharts();




// bar chart 

var Accio_gitrepo="Github Repo: https://github.com/colorfest/d3js";
var data = [{
  "name": "الاغلاق",
  "actor": "Will Smith",
  "rank": 25,
  "description": "An expert marksman and assassin."
}, {
  "name": "العقود والمشتريات",
  "actor": "Margot Robbie",
  "rank": 40,
  "description": "The Joker's main squeeze, the former psychiatrist is an insane sociopath with tremendous sex appeal."
}, {
  "name": "الترسية",
  "actor": "Joel Kinnaman",
  "rank": 70,
  "description": "The defacto leader of the group, he takes his orders directly from Amanda Waller."
}, {
  "name": "اعتماد الميزانية",
  "actor": "Jai Courtney",
  "rank": 80,
  "description": "As his name suggests, Boomerang is an assassin who uses ... boomerangs."
}, {
  "name": "التأهيل",
  "actor": "Jay Hernandez",
  "rank": 100,
  "description": "A former gang member who has seen a lot of violence, El Diablo can summon flames but tends to keep his anger and bloodlust in check."
}, {
  "name": "فحص العروض",
  "actor": "Adewale Akinnuoye-Agbaje",
  "rank": 100,
  "description": "The most unique in appearance, Killer Croc is one of the most vicious and scariest of all the members, being a deformed humanoid with the appearance of a crocodile."
}, {
  "name": "فتح العروض",
  "actor": "Cara Delevingne",
  "rank": 100,
  "description": "Once an archeologist, the former June Moone was possessed by a witch."
}];

var margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 60
  },
  width = 500 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom,
  x = d3.scaleBand().rangeRound([15, width]).paddingInner(0.5),
  y = d3.scaleLinear().range([height, 0]);

//draw axis
var xAxis = d3.axisBottom().scale(x).ticks(6);

var yAxis = d3.axisLeft().scale(y).ticks(5).tickSizeInner(-width).tickSizeOuter(0).tickPadding(10);

var svg = d3.select("#barGraph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data.map(function(d) {
  return d.name;
}));

y.domain([0, d3.max(data, function(d) {
  return d.rank;
})]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0, " + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "start")
  .attr("dx", "-0.5em")
  .attr("dy", "-.55em")
  .attr("y", 30)
  .attr("transform", "rotate(-45)");

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 5)
  .attr("dy", "0.8em")
  .attr("text-anchor", "end")
  .text("");

svg.selectAll("bar")
  .data(data)
  .enter()
  .append("rect")
  .style("fill", "#0C66E1")
  .attr("x", function(d) {
    return x(d.name);
  })
  .attr("width", x.bandwidth())
  .attr("y", function(d) {
    return y(d.rank);
  })
  .attr("height", function(d) {
    return height - y(d.rank);
  })
  .on("mouseover", function() {
    tooltip.style("display", null);
  })
  .on("mouseout", function() {
    tooltip.style("display", "none");
  })

.on("mousemove", function(d) {

  tooltip.transition().duration(200)
    .style("opacity", 0.9);
  tooltip.select("div").html("Name: <strong>" + d.name + "</strong><br/>Rank: <strong>" + d.rank + "</strong>")
    .style("position", "fixed")
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 28) + "px");

});

var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0.5);

tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "#ffffff")
  .style("opacity", 0.5);

tooltip.append("div")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "1.5em")
  .attr("font-weight", "bold");