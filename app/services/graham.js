
module.exports = function(points) {

	if (points.length < 3) { 
		return points; 
	}
	
	let minimum = function(Q) { 
		// Find minimum y point (in case of tie select leftmost)         
		// Sort by y coordinate to ease the left most finding
		Q.sort(function(a,b) { 
			return a[1] - b[1]; 
		}); 

		let y_min = 1000000; 
		let smallest = 0; 
		for(let i=0; i < Q.length; ++i) { 
			let p = Q[i]; 
			if (p[1] < y_min) { 
				y_min = p[1]; 
				smallest= i; 
			} 
			else if (p[1] == y_min) { // Select left most 
				if (Q[i-1][0] > p[0]) {
					smallest = i;
				}
			}
		}
		return smallest;
	}

	let distance = function(a, b) {
		return (b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]);
	}

	let filter_equal_angles = function(p0, Q) {
		// => If two points have same polar angle remove the closet to p0
		// Distance can be calculated with vector length...
		for(let i=1; i < Q.length; i++) { 
			if (Q[i-1].polar == Q[i].polar) { 
				let d1 = distance(p0, Q[i-1]); 
				let d2 = distance(p0, Q[i]); 
				if (d2 < d1) {
					Q.splice(i, 1);
				} else {
					Q.splice(i-1, 1);
				}
			}
		}
	}

	let cartesian_angle = function(x, y) {
		if (x > 0 && y > 0)
			return Math.atan( y / x);
		else if (x < 0 && y > 0)
			return Math.atan(-x / y) + Math.PI / 2;
		else if (x < 0 && y < 0) 
			return Math.atan( y / x) + Math.PI; 
		else if (x > 0 && y < 0) 
			return Math.atan(-x / y) + Math.PI / 2 + Math.PI; 
		else if (x == 0 && y > 0)
			return Math.PI / 2;
		else if (x < 0 && y == 0) 
			return Math.PI; 
		else if (x == 0 && y < 0) 
		return Math.PI / 2 + Math.PI; 
		else return 0; 
	} 

	let calculate_angle = function(p1, p2) { 
		return cartesian_angle(p2[0] - p1[0], p2[1] - p1[1]) 
	}

	let calculate_polar_angles = function(p0, Q) { 
		for(let i=0; i < Q.length; i++) { 
			Q[i].polar = calculate_angle(p0, Q[i]); 
		}    
	}
	
	// Three points are a counter-clockwise turn 
	// if ccw > 0, clockwise if ccw < 0, and collinear if ccw = 0 
	let ccw = function(p1, p2, p3) { 
		return (p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]); 
	} 

	// Find minimum point 
	let Q = points.slice(); // Make copy 
	let minIndex = minimum(Q); 
	let p0 = Q[minIndex]; 
	Q.splice(minIndex, 1); // Remove p0 from Q
    
	// Sort by polar angle to p0              
	calculate_polar_angles(p0, Q); 
	Q.sort(function(a,b) { 
		return a.polar - b.polar; 
	});

	// Remove all with same polar angle but the farthest. 
    filter_equal_angles(p0, Q); 

    // Graham scan 
    let S = []; 
    S.push(p0); 
    S.push(Q[0]); 
    S.push(Q[1]); 
    for(let i=2; i < Q.length; ++i) { 
		let pi = Q[i]; 
		while(ccw(S[S.length - 2], S[S.length - 1], pi) <= 0) { 
			S.pop(); 
		} 
		S.push(pi); 
	}
	
	return S;
}