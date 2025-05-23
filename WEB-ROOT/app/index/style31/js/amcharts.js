if (!AmCharts) var AmCharts = {};
AmCharts.inheriting = {};
AmCharts.Class = function(a) {
	var b = function() {
		arguments[0] !== AmCharts.inheriting && (this.events = {}, this.construct.apply(this, arguments))
	};
	a.inherits ? (b.prototype = new a.inherits(AmCharts.inheriting), b.base = a.inherits.prototype,
	delete a.inherits
		) : (b.prototype.createEvents = function() {
			for (var a = 0, b = arguments.length; a < b; a++) this.events[arguments[a]] = []
		}, b.prototype.listenTo = function(a, b, c) {
			a.events[b].push({
				handler : c,
				scope : this
			})
		}, b.prototype.addListener = function(a, b, c) {
			this.events[a].push({
				handler : b,
				scope : c
			})
		}, b.prototype.removeListener = function(a, b, c) {
			a = a.events[b];
			for (b = a.length - 1; 0 <= b; b--) a[b].handler === c && a.splice(b, 1)
		}, b.prototype.fire = function(a, b) {
			for (var c = this.events[a], g = 0, h = c.length; g < h; g++) {
				var k = c[g];
				k.handler.call(k.scope, b)
			}
		});
	for (var c in a) b.prototype[c] = a[c];
	return b
};
AmCharts.charts = [];
AmCharts.addChart = function(a) {
	AmCharts.charts.push(a)
};
AmCharts.removeChart = function(a) {
	for (var b = AmCharts.charts, c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1)
};
AmCharts.IEversion = 0;-1 != navigator.appVersion.indexOf("MSIE") && document.documentMode && (AmCharts.IEversion = Number(document.documentMode));
if (document.addEventListener || window.opera) AmCharts.isNN = !0, AmCharts.isIE = !1, AmCharts.dx = 0.5, AmCharts.dy = 0.5;
document.attachEvent && (AmCharts.isNN = !1, AmCharts.isIE = !0, 9 > AmCharts.IEversion && (AmCharts.dx = 0, AmCharts.dy = 0));window.chrome && (AmCharts.chrome = !0);
AmCharts.handleResize = function() {
	for (var a = AmCharts.charts, b = 0; b < a.length; b++) {
		var c = a[b];
		c && c.div && c.handleResize()
	}
};
AmCharts.handleMouseUp = function(a) {
	for (var b = AmCharts.charts, c = 0; c < b.length; c++) {
		var d = b[c];
		d && d.handleReleaseOutside(a)
	}
};
AmCharts.handleMouseMove = function(a) {
	for (var b = AmCharts.charts, c = 0; c < b.length; c++) {
		var d = b[c];
		d && d.handleMouseMove(a)
	}
};
AmCharts.resetMouseOver = function() {
	for (var a = AmCharts.charts, b = 0; b < a.length; b++) {
		var c = a[b];
		c && (c.mouseIsOver = !1)
	}
};
AmCharts.onReadyArray = [];
AmCharts.ready = function(a) {
	AmCharts.onReadyArray.push(a)
};
AmCharts.handleLoad = function() {
	for (var a = AmCharts.onReadyArray, b = 0; b < a.length; b++) (0, a[b])()
};
AmCharts.useUTC = !1;
AmCharts.updateRate = 40;
AmCharts.uid = 0;
AmCharts.getUniqueId = function() {
	AmCharts.uid++;return "AmChartsEl-" + AmCharts.uid
};AmCharts.isNN && (document.addEventListener("mousemove", AmCharts.handleMouseMove, !0), window.addEventListener("resize", AmCharts.handleResize, !0), document.addEventListener("mouseup", AmCharts.handleMouseUp, !0), window.addEventListener("load", AmCharts.handleLoad, !0));AmCharts.isIE && (document.attachEvent("onmousemove", AmCharts.handleMouseMove), window.attachEvent("onresize", AmCharts.handleResize), document.attachEvent("onmouseup", AmCharts.handleMouseUp), window.attachEvent("onload", AmCharts.handleLoad));
AmCharts.clear = function() {
	var a = AmCharts.charts;
	if (a)
		for (var b = 0; b < a.length; b++) a[b].clear();
	AmCharts.charts = null;AmCharts.isNN && (document.removeEventListener("mousemove", AmCharts.handleMouseMove, !0), window.removeEventListener("resize", AmCharts.handleResize, !0), document.removeEventListener("mouseup", AmCharts.handleMouseUp, !0), window.removeEventListener("load", AmCharts.handleLoad, !0));AmCharts.isIE && (document.detachEvent("onmousemove", AmCharts.handleMouseMove), window.detachEvent("onresize", AmCharts.handleResize), document.detachEvent("onmouseup", AmCharts.handleMouseUp), window.detachEvent("onload", AmCharts.handleLoad))
};
AmCharts.AmChart = AmCharts.Class({
	construct : function() {
		this.version = "2.11.3";AmCharts.addChart(this);this.createEvents("dataUpdated", "init", "rendered", "drawn");
		this.height = this.width = "100%";
		this.dataChanged = !0;
		this.chartCreated = !1;
		this.previousWidth = this.previousHeight = 0;
		this.backgroundColor = "#FFFFFF";
		this.borderAlpha = this.backgroundAlpha = 0;
		this.color = this.borderColor = "#000000";
		this.fontFamily = "Verdana";
		this.fontSize = 11;
		this.numberFormatter = {
			precision : -1,
			decimalSeparator : ".",
			thousandsSeparator : ","
		};
		this.percentFormatter = {
			precision : 2,
			decimalSeparator : ".",
			thousandsSeparator : ","
		};
		this.labels = [];
		this.allLabels = [];
		this.titles = [];
		this.marginRight = this.marginLeft = this.autoMarginOffset = 0;
		this.timeOuts = [];
		var a = document.createElement("div"),
			b = a.style;
		b.overflow = "hidden";
		b.position = "relative";
		b.textAlign = "left";
		this.chartDiv = a;
		a = document.createElement("div");
		b = a.style;
		b.overflow = "hidden";
		b.position = "relative";
		b.textAlign = "left";
		this.legendDiv = a;
		this.balloon = new AmCharts.AmBalloon;
		this.balloon.chart = this;
		this.titleHeight = 0;
		this.prefixesOfBigNumbers = [ {
			number : 1E3,
			prefix : "k"
		}, {
			number : 1E6,
			prefix : "M"
		}, {
			number : 1E9,
			prefix : "G"
		}, {
			number : 1E12,
			prefix : "T"
		}, {
			number : 1E15,
			prefix : "P"
		}, {
			number : 1E18,
			prefix : "E"
		}, {
			number : 1E21,
			prefix : "Z"
		}, {
			number : 1E24,
			prefix : "Y"
		} ];
		this.prefixesOfSmallNumbers = [ {
			number : 1E-24,
			prefix : "y"
		}, {
			number : 1E-21,
			prefix : "z"
		}, {
			number : 1E-18,
			prefix : "a"
		}, {
			number : 1E-15,
			prefix : "f"
		}, {
			number : 1E-12,
			prefix : "p"
		}, {
			number : 1E-9,
			prefix : "n"
		}, {
			number : 1E-6,
			prefix : "\u03bc"
		}, {
			number : 0.001,
			prefix : "m"
		} ];
		this.panEventsEnabled = !1;
		AmCharts.bezierX = 3;
		AmCharts.bezierY = 6;
		this.product = ""
	},
	drawChart : function() {
		this.drawBackground();this.redrawLabels();this.drawTitles()
	},
	drawBackground : function() {
		AmCharts.remove(this.background);
		var a = this.container,
			b = this.backgroundColor,
			c = this.backgroundAlpha,
			d = this.set,
			e = this.updateWidth();
		this.realWidth = e;
		var f = this.updateHeight();
		this.realHeight = f;9 > AmCharts.IEversion && 0 < AmCharts.IEversion && (c = 0.001);
		this.background = b = AmCharts.polygon(a, [ 0, e - 1, e - 1, 0 ], [ 0, 0, f - 1, f - 1 ], b, c, 1, this.borderColor, this.borderAlpha);d.push(b);
		if (b = this.backgroundImage) this.path && (b = this.path + b), this.bgImg = a = a.image(b, 0, 0, e, f), d.push(a)
	},
	drawTitles : function() {
		var a = this.titles;
		if (AmCharts.ifArray(a)) {
			var b = 20,
				c;
			for (c = 0; c < a.length; c++) {
				var d = a[c],
					e = d.color;
				void 0 === e && (e = this.color);var f = d.size;
				isNaN(d.alpha);var g = this.marginLeft,
					e = AmCharts.text(this.container, d.text, e, this.fontFamily, f);
				e.translate(g + (this.realWidth - this.marginRight - g) / 2, b);
				g = !0;void 0 !== d.bold && (g = d.bold);g && e.attr({
					"font-weight" : "bold"
				});
				b += f + 6;this.freeLabelsSet.push(e)
			}
		}
	},
	write : function(a) {
		var b = this.balloon;
		b && !b.chart && (b.chart = this);
		a = "object" != typeof a ? document.getElementById(a) : a;
		a.innerHTML = "";
		this.div = a;
		a.style.overflow = "hidden";
		a.style.textAlign = "left";
		var b = this.chartDiv,
			c = this.legendDiv,
			d = this.legend,
			e = c.style,
			f = b.style;
		this.measure();
		var g,
			h;
		if (d) switch (d.position) {
			case "bottom":
				a.appendChild(b);a.appendChild(c);
				break;case "top":
				a.appendChild(c);a.appendChild(b);
				break;case "absolute":
				g = document.createElement("div");h = g.style;h.position = "relative";h.width = a.style.width;h.height = a.style.height;a.appendChild(g);e.position = "absolute";f.position = "absolute";void 0 !== d.left && (e.left = d.left + "px");void 0 !== d.right && (e.right = d.right + "px");void 0 !== d.top && (e.top = d.top + "px");void 0 !== d.bottom && (e.bottom = d.bottom + "px");d.marginLeft = 0;d.marginRight = 0;g.appendChild(b);g.appendChild(c);
				break;case "right":
				g = document.createElement("div");h = g.style;h.position = "relative";h.width = a.style.width;h.height = a.style.height;a.appendChild(g);e.position = "relative";f.position = "absolute";g.appendChild(b);g.appendChild(c);
				break;case "left":
				g = document.createElement("div");h = g.style;h.position = "relative";h.width = a.style.width;h.height = a.style.height;a.appendChild(g);e.position = "absolute";f.position = "relative";g.appendChild(b);g.appendChild(c);
				break;case "outside":
				a.appendChild(b)
		}
		else a.appendChild(b);
		this.listenersAdded || (this.addListeners(), this.listenersAdded = !0);this.initChart()
	},
	createLabelsSet : function() {
		AmCharts.remove(this.labelsSet);
		this.labelsSet = this.container.set();this.freeLabelsSet.push(this.labelsSet)
	},
	initChart : function() {
		this.divIsFixed = AmCharts.findIfFixed(this.chartDiv);
		this.previousHeight = this.divRealHeight;
		this.previousWidth = this.divRealWidth;this.destroy();
		var a = 0;
		document.attachEvent && !window.opera && (a = 1);
		this.dmouseX = this.dmouseY = 0;
		var b = document.getElementsByTagName("html")[0];
		b && window.getComputedStyle && (b = window.getComputedStyle(b, null)) && (this.dmouseY = AmCharts.removePx(b.getPropertyValue("margin-top")), this.dmouseX = AmCharts.removePx(b.getPropertyValue("margin-left")));
		this.mouseMode = a;
		this.container = new AmCharts.AmDraw(this.chartDiv, this.realWidth, this.realHeight);
		if (AmCharts.VML || AmCharts.SVG) a = this.container, this.set = a.set(), this.gridSet = a.set(), this.graphsBehindSet = a.set(), this.bulletBehindSet = a.set(), this.columnSet = a.set(), this.graphsSet = a.set(), this.trendLinesSet = a.set(), this.axesLabelsSet = a.set(), this.axesSet = a.set(), this.cursorSet = a.set(), this.scrollbarsSet = a.set(), this.bulletSet = a.set(), this.freeLabelsSet = a.set(), this.balloonsSet = a.set(), this.balloonsSet.setAttr("id", "balloons"), this.zoomButtonSet = a.set(), this.linkSet = a.set(), this.drb(), this.renderFix()
	},
	measure : function() {
		var a = this.div,
			b = this.chartDiv,
			c = a.offsetWidth,
			d = a.offsetHeight,
			e = this.container;
		a.clientHeight && (c = a.clientWidth, d = a.clientHeight);
		var f = AmCharts.removePx(AmCharts.getStyle(a, "padding-left")),
			g = AmCharts.removePx(AmCharts.getStyle(a, "padding-right")),
			h = AmCharts.removePx(AmCharts.getStyle(a, "padding-top")),
			k = AmCharts.removePx(AmCharts.getStyle(a, "padding-bottom"));
		isNaN(f) || (c -= f);isNaN(g) || (c -= g);isNaN(h) || (d -= h);isNaN(k) || (d -= k);
		f = a.style;
		a = f.width;
		f = f.height;-1 != a.indexOf("px") && (c = AmCharts.removePx(a));-1 != f.indexOf("px") && (d = AmCharts.removePx(f));
		a = AmCharts.toCoordinate(this.width, c);
		f = AmCharts.toCoordinate(this.height, d);
		if (a != this.previousWidth || f != this.previousHeight) b.style.width = a + "px", b.style.height = f + "px", e && e.setSize(a, f), this.balloon.setBounds(2, 2, a - 2, f);
		this.realWidth = a;
		this.realHeight = f;
		this.divRealWidth = c;
		this.divRealHeight = d
	},
	destroy : function() {
		this.chartDiv.innerHTML = "";this.clearTimeOuts()
	},
	clearTimeOuts : function() {
		var a = this.timeOuts;
		if (a) {
			var b;
			for (b = 0; b < a.length; b++) clearTimeout(a[b])
		}
		this.timeOuts = []
	},
	clear : function(a) {
		AmCharts.callMethod("clear", [ this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor ]);
		this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null;this.clearTimeOuts();this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv));a || AmCharts.removeChart(this)
	},
	setMouseCursor : function(a) {
		"auto" == a && AmCharts.isNN && (a = "default");
		this.chartDiv.style.cursor = a;
		this.legendDiv.style.cursor = a
	},
	redrawLabels : function() {
		this.labels = [];
		var a = this.allLabels;
		this.createLabelsSet();
		var b;
		for (b = 0; b < a.length; b++) this.drawLabel(a[b])
	},
	drawLabel : function(a) {
		if (this.container) {
			var b = a.y,
				c = a.text,
				d = a.align,
				e = a.size,
				f = a.color,
				g = a.rotation,
				h = a.alpha,
				k = a.bold,
				l = AmCharts.toCoordinate(a.x, this.realWidth),
				b = AmCharts.toCoordinate(b, this.realHeight);
			l || (l = 0);b || (b = 0);void 0 === f && (f = this.color);isNaN(e) && (e = this.fontSize);d || (d = "start");"left" == d && (d = "start");"right" == d && (d = "end");"center" == d && (d = "middle", g ? b = this.realHeight - b + b / 2 : l = this.realWidth / 2 - l);void 0 === h && (h = 1);void 0 === g && (g = 0);
			b += e / 2;
			c = AmCharts.text(this.container, c, f, this.fontFamily, e, d, k, h);c.translate(l, b);0 !== g && c.rotate(g);a.url && (c.setAttr("cursor", "pointer"), c.click(function() {
				AmCharts.getURL(a.url)
			}));this.labelsSet.push(c);this.labels.push(c)
		}
	},
	addLabel : function(a, b, c, d, e, f, g, h, k, l) {
		a = {
			x : a,
			y : b,
			text : c,
			align : d,
			size : e,
			color : f,
			alpha : h,
			rotation : g,
			bold : k,
			url : l
		};this.container && this.drawLabel(a);this.allLabels.push(a)
	},
	clearLabels : function() {
		var a = this.labels,
			b;
		for (b = a.length - 1; 0 <= b; b--) a[b].remove();
		this.labels = [];
		this.allLabels = []
	},
	updateHeight : function() {
		var a = this.divRealHeight,
			b = this.legend;
		if (b) {
			var c = this.legendDiv.offsetHeight,
				b = b.position;
			if ("top" == b || "bottom" == b) a -= c, 0 > a && (a = 0), this.chartDiv.style.height = a + "px"
		}
		return a
	},
	updateWidth : function() {
		var a = this.divRealWidth,
			b = this.divRealHeight,
			c = this.legend;
		if (c) {
			var d = this.legendDiv,
				e = d.offsetWidth,
				f = d.offsetHeight,
				d = d.style,
				g = this.chartDiv.style,
				c = c.position;
			if ("right" == c || "left" == c) a -= e, 0 > a && (a = 0), g.width = a + "px", "left" == c ? g.left = e + "px" : d.left = a + "px", d.top = (b - f) / 2 + "px"
		}
		return a
	},
	getTitleHeight : function() {
		var a = 0,
			b = this.titles;
		if (0 < b.length) {
			var a = 15,
				c;
			for (c = 0; c < b.length; c++) a += b[c].size + 6
		}
		return a
	},
	addTitle : function(a, b, c, d, e) {
		isNaN(b) && (b = this.fontSize + 2);
		a = {
			text : a,
			size : b,
			color : c,
			alpha : d,
			bold : e
		};this.titles.push(a);return a
	},
	addListeners : function() {
		var a = this,
			b = a.chartDiv;
		AmCharts.isNN && (a.panEventsEnabled && "ontouchstart" in document.documentElement && (b.addEventListener("touchstart", function(b) {
			a.handleTouchMove.call(a, b);a.handleTouchStart.call(a, b)
		}, !0), b.addEventListener("touchmove", function(b) {
			a.handleTouchMove.call(a, b)
		}, !0), b.addEventListener("touchend", function(b) {
			a.handleTouchEnd.call(a, b)
		}, !0)), b.addEventListener("mousedown", function(b) {
			a.handleMouseDown.call(a, b)
		}, !0), b.addEventListener("mouseover", function(b) {
			a.handleMouseOver.call(a, b)
		}, !0), b.addEventListener("mouseout", function(b) {
			a.handleMouseOut.call(a, b)
		}, !0));AmCharts.isIE && (b.attachEvent("onmousedown", function(b) {
			a.handleMouseDown.call(a, b)
		}), b.attachEvent("onmouseover", function(b) {
			a.handleMouseOver.call(a, b)
		}), b.attachEvent("onmouseout", function(b) {
			a.handleMouseOut.call(a, b)
		}))
	},
	dispDUpd : function() {
		var a;
		this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, a = "dataUpdated", this.fire(a, {
			type : a,
			chart : this
		}));this.chartCreated || (a = "init", this.fire(a, {
			type : a,
			chart : this
		}));this.chartRendered || (a = "rendered", this.fire(a, {
			type : a,
			chart : this
		}), this.chartRendered = !0);
		a = "drawn";this.fire(a, {
			type : a,
			chart : this
		})
	},
	drb : function() {
		var a = this.product,
			b = a + "",
			c = window.location.hostname.split("."),
			d;
		2 <= c.length && (d = c[c.length - 2] + "." + c[c.length - 1]);AmCharts.remove(this.bbset);
		if (d != b) {
			var b = b + "/?utm_source=swf&utm_medium=demo&utm_campaign=jsDemo" + a,
				e = " ",
				c = 145;
			"ammap" == a && (e = "tool by ", c = 125);
			d = AmCharts.rect(this.container, c, 20, "#FFFFFF", 1);
			e = AmCharts.text(this.container, e + a + "", "#000000", "Verdana", 11, "start");e.translate(7, 9);
			d = this.container.set([ d, e ]);"ammap" == a && d.translate(this.realWidth - c, 0);
			this.bbset = d;this.linkSet.push(d);d.setAttr("cursor", "pointer");d.click(function() {
				window.location.href = "http://" + b
			});
			for (a = 0; a < d.length; a++) d[a].attr({
					cursor : "pointer"
				})
		}
	},
	validateSize : function() {
		var a = this;
		a.measure();
		var b = a.legend;
		if ((a.realWidth != a.previousWidth || a.realHeight != a.previousHeight) && 0 < a.realWidth && 0 < a.realHeight) {
			a.sizeChanged = !0;
			if (b) {
				clearTimeout(a.legendInitTO);
				var c = setTimeout(function() {
					b.invalidateSize()
				}, 100);
				a.timeOuts.push(c);
				a.legendInitTO = c
			}
			a.marginsUpdated = "xy" != a.chartType ? !1 : !0;clearTimeout(a.initTO);
			c = setTimeout(function() {
				a.initChart()
			}, 150);a.timeOuts.push(c);
			a.initTO = c
		}
		a.renderFix();b && b.renderFix()
	},
	invalidateSize : function() {
		this.previousHeight = this.previousWidth = NaN;this.invalidateSizeReal()
	},
	invalidateSizeReal : function() {
		var a = this;
		a.marginsUpdated = !1;clearTimeout(a.validateTO);
		var b = setTimeout(function() {
			a.validateSize()
		}, 5);
		a.timeOuts.push(b);
		a.validateTO = b
	},
	validateData : function(a) {
		this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = "xy" != this.chartType ? !1 : !0, this.initChart(a))
	},
	validateNow : function() {
		this.listenersAdded = !1;this.write(this.div)
	},
	showItem : function(a) {
		a.hidden = !1;this.initChart()
	},
	hideItem : function(a) {
		a.hidden = !0;this.initChart()
	},
	hideBalloon : function() {
		var a = this;
		a.hoverInt = setTimeout(function() {
			a.hideBalloonReal.call(a)
		}, 80)
	},
	cleanChart : function() {},
	hideBalloonReal : function() {
		var a = this.balloon;
		a && a.hide()
	},
	showBalloon : function(a, b, c, d, e) {
		var f = this;
		clearTimeout(f.balloonTO);
		f.balloonTO = setTimeout(function() {
			f.showBalloonReal.call(f, a, b, c, d, e)
		}, 1)
	},
	showBalloonReal : function(a, b, c, d, e) {
		this.handleMouseMove();
		var f = this.balloon;
		f.enabled && (f.followCursor(!1), f.changeColor(b), c || f.setPosition(d, e), f.followCursor(c), a && f.showBalloon(a))
	},
	handleTouchMove : function(a) {
		this.hideBalloon();
		var b = this.chartDiv;
		a.touches && (a = a.touches.item(0), this.mouseX = a.pageX - AmCharts.findPosX(b), this.mouseY = a.pageY - AmCharts.findPosY(b))
	},
	handleMouseOver : function(a) {
		AmCharts.resetMouseOver();
		this.mouseIsOver = !0
	},
	handleMouseOut : function(a) {
		AmCharts.resetMouseOver();
		this.mouseIsOver = !1
	},
	handleMouseMove : function(a) {
		if (this.mouseIsOver) {
			var b = this.chartDiv;
			a || (a = window.event);
			var c,
				d;
			if (a) {
				this.posX = AmCharts.findPosX(b);
				this.posY = AmCharts.findPosY(b);switch (this.mouseMode) {
				case 1:
					c = a.clientX - this.posX;d = a.clientY - this.posY;
					if (!this.divIsFixed) {
						var b = document.body,
							e,
							f;
						b && (e = b.scrollLeft, y1 = b.scrollTop);
						if (b = document.documentElement) f = b.scrollLeft, y2 = b.scrollTop;
						e = Math.max(e, f);
						f = Math.max(y1, y2);
						c += e;
						d += f
					}
					break;case 0:
					this.divIsFixed ? (c = a.clientX - this.posX, d = a.clientY - this.posY) : (c = a.pageX - this.posX, d = a.pageY - this.posY)
				}
				a.touches && (a = a.touches.item(0), c = a.pageX - this.posX, d = a.pageY - this.posY);
				this.mouseX = c - this.dmouseX;
				this.mouseY = d - this.dmouseY
			}
		}
	},
	handleTouchStart : function(a) {
		this.handleMouseDown(a)
	},
	handleTouchEnd : function(a) {
		AmCharts.resetMouseOver();this.handleReleaseOutside(a)
	},
	handleReleaseOutside : function(a) {},
	handleMouseDown : function(a) {
		AmCharts.resetMouseOver();
		this.mouseIsOver = !0;a && a.preventDefault && a.preventDefault()
	},
	addLegend : function(a, b) {
		AmCharts.extend(a, new AmCharts.AmLegend);
		var c;
		c = "object" != typeof b ? document.getElementById(b) : b;
		this.legend = a;
		a.chart = this;
		c ? (a.div = c, a.position = "outside", a.autoMargins = !1) : a.div = this.legendDiv;
		c = this.handleLegendEvent;this.listenTo(a, "showItem", c);this.listenTo(a, "hideItem", c);this.listenTo(a, "clickMarker", c);this.listenTo(a, "rollOverItem", c);this.listenTo(a, "rollOutItem", c);this.listenTo(a, "rollOverMarker", c);this.listenTo(a, "rollOutMarker", c);this.listenTo(a, "clickLabel", c)
	},
	removeLegend : function() {
		this.legend = void 0;
		this.legendDiv.innerHTML = ""
	},
	handleResize : function() {
		(AmCharts.isPercents(this.width) || AmCharts.isPercents(this.height)) && this.invalidateSizeReal();this.renderFix()
	},
	renderFix : function() {
		if (!AmCharts.VML) {
			var a = this.container;
			a && a.renderFix()
		}
	},
	getSVG : function() {
		if (AmCharts.hasSVG) return this.container
	}
});
AmCharts.Slice = AmCharts.Class({
	construct : function() {}
});
AmCharts.SerialDataItem = AmCharts.Class({
	construct : function() {}
});
AmCharts.GraphDataItem = AmCharts.Class({
	construct : function() {}
});
AmCharts.Guide = AmCharts.Class({
	construct : function() {}
});
AmCharts.toBoolean = function(a, b) {
	if (void 0 === a) return b;
	switch (String(a).toLowerCase()) {
	case "true":
	case "yes":
	case "1":
		return !0;case "false":
	case "no":
	case "0":
	case null:
		return !1;default:
		return Boolean(a)
	}
};
AmCharts.removeFromArray = function(a, b) {
	var c;
	for (c = a.length - 1; 0 <= c; c--) a[c] == b && a.splice(c, 1)
};
AmCharts.getStyle = function(a, b) {
	var c = "";
	document.defaultView && document.defaultView.getComputedStyle ? c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b) : a.currentStyle && (b = b.replace(/\-(\w)/g, function(a, b) {
		return b.toUpperCase()
	}), c = a.currentStyle[b]);return c
};
AmCharts.removePx = function(a) {
	return Number(a.substring(0, a.length - 2))
};
AmCharts.getURL = function(a, b) {
	if (a)
		if ("_self" != b && b)
			if ("_top" == b && window.top)
				window.top.location.href = a;
			else if ("_parent" == b && window.parent)
				window.parent.location.href = a;else {
				var c = document.getElementsByName(b)[0];
				c ? c.src = a : window.open(a)
		}
		else
			window.location.href = a
};
AmCharts.formatMilliseconds = function(a, b) {
	if (-1 != a.indexOf("fff")) {
		var c = b.getMilliseconds(),
			d = String(c);
		10 > c && (d = "00" + c);10 <= c && 100 > c && (d = "0" + c);
		a = a.replace(/fff/g, d)
	}
	return a
};
AmCharts.ifArray = function(a) {
	return a && 0 < a.length ? !0 : !1
};
AmCharts.callMethod = function(a, b) {
	var c;
	for (c = 0; c < b.length; c++) {
		var d = b[c];
		if (d) {
			if (d[a]) d[a]();
			var e = d.length;
			if (0 < e) {
				var f;
				for (f = 0; f < e; f++) {
					var g = d[f];
					if (g && g[a]) g[a]()
				}
			}
		}
	}
};
AmCharts.toNumber = function(a) {
	return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, ""))
};
AmCharts.toColor = function(a) {
	if ("" !== a && void 0 !== a)
		if (-1 != a.indexOf(",")) {
			a = a.split(",");
			var b;
			for (b = 0; b < a.length; b++) {
				var c = a[b].substring(a[b].length - 6, a[b].length);
				a[b] = "#" + c
			}
		} else a = a.substring(a.length - 6, a.length), a = "#" + a;
	return a
};
AmCharts.toCoordinate = function(a, b, c) {
	var d;
	void 0 !== a && (a = String(a), c && c < b && (b = c), d = Number(a), -1 != a.indexOf("!") && (d = b - Number(a.substr(1))), -1 != a.indexOf("%") && (d = b * Number(a.substr(0, a.length - 1)) / 100));return d
};
AmCharts.fitToBounds = function(a, b, c) {
	a < b && (a = b);a > c && (a = c);return a
};
AmCharts.isDefined = function(a) {
	return void 0 === a ? !1 : !0
};
AmCharts.stripNumbers = function(a) {
	return a.replace(/[0-9]+/g, "")
};
AmCharts.extractPeriod = function(a) {
	var b = AmCharts.stripNumbers(a),
		c = 1;
	b != a && (c = Number(a.slice(0, a.indexOf(b))));return {
		period : b,
		count : c
	}
};
AmCharts.resetDateToMin = function(a, b, c, d) {
	void 0 === d && (d = 1);
	var e,
		f,
		g,
		h,
		k,
		l,
		m;
	AmCharts.useUTC ? (e = a.getUTCFullYear(), f = a.getUTCMonth(), g = a.getUTCDate(), h = a.getUTCHours(), k = a.getUTCMinutes(), l = a.getUTCSeconds(), m = a.getUTCMilliseconds(), a = a.getUTCDay()) : (e = a.getFullYear(), f = a.getMonth(), g = a.getDate(), h = a.getHours(), k = a.getMinutes(), l = a.getSeconds(), m = a.getMilliseconds(), a = a.getDay());switch (b) {
	case "YYYY":
		e = Math.floor(e / c) * c;f = 0;g = 1;m = l = k = h = 0;
		break;case "MM":
		f = Math.floor(f / c) * c;g = 1;m = l = k = h = 0;
		break;case "WW":
		0 === a && 0 < d && (a = 7);g = g - a + d;m = l = k = h = 0;
		break;case "DD":
		m = l = k = h = 0;
		break;case "hh":
		h = Math.floor(h / c) * c;m = l = k = 0;
		break;case "mm":
		k = Math.floor(k / c) * c;m = l = 0;
		break;case "ss":
		l = Math.floor(l / c) * c;m = 0;
		break;case "fff":
		m = Math.floor(m / c) * c
	}
	AmCharts.useUTC ? (a = new Date, a.setUTCFullYear(e, f, g), a.setUTCHours(h, k, l, m)) : a = new Date(e, f, g, h, k, l, m);return a
};
AmCharts.getPeriodDuration = function(a, b) {
	void 0 === b && (b = 1);
	var c;
	switch (a) {
	case "YYYY":
		c = 316224E5;
		break;case "MM":
		c = 26784E5;
		break;case "WW":
		c = 6048E5;
		break;case "DD":
		c = 864E5;
		break;case "hh":
		c = 36E5;
		break;case "mm":
		c = 6E4;
		break;case "ss":
		c = 1E3;
		break;case "fff":
		c = 1
	}
	return c * b
};
AmCharts.roundTo = function(a, b) {
	if (0 > b) return a;
	var c = Math.pow(10, b);
	return Math.round(a * c) / c
};
AmCharts.toFixed = function(a, b) {
	var c = String(Math.round(a * Math.pow(10, b)));
	if (0 < b) {
		var d = c.length;
		if (d < b) {
			var e;
			for (e = 0; e < b - d; e++) c = "0" + c
		}
		d = c.substring(0, c.length - b);"" === d && (d = 0);return d + "." + c.substring(c.length - b, c.length)
	}
	return String(c)
};
AmCharts.intervals = {
	s : {
		nextInterval : "ss",
		contains : 1E3
	},
	ss : {
		nextInterval : "mm",
		contains : 60,
		count : 0
	},
	mm : {
		nextInterval : "hh",
		contains : 60,
		count : 1
	},
	hh : {
		nextInterval : "DD",
		contains : 24,
		count : 2
	},
	DD : {
		nextInterval : "",
		contains : Infinity,
		count : 3
	}
};
AmCharts.getMaxInterval = function(a, b) {
	var c = AmCharts.intervals;
	return a >= c[b].contains ? (a = Math.round(a / c[b].contains), b = c[b].nextInterval, AmCharts.getMaxInterval(a, b)) : "ss" == b ? c[b].nextInterval : b
};
AmCharts.formatDuration = function(a, b, c, d, e, f) {
	var g = AmCharts.intervals,
		h = f.decimalSeparator;
	if (a >= g[b].contains) {
		var k = a - Math.floor(a / g[b].contains) * g[b].contains;
		"ss" == b && (k = AmCharts.formatNumber(k, f), 1 == k.split(h)[0].length && (k = "0" + k));("mm" == b || "hh" == b) && 10 > k && (k = "0" + k);
		c = k + "" + d[b] + "" + c;
		a = Math.floor(a / g[b].contains);
		b = g[b].nextInterval;return AmCharts.formatDuration(a, b, c, d, e, f)
	}
	"ss" == b && (a = AmCharts.formatNumber(a, f), 1 == a.split(h)[0].length && (a = "0" + a));("mm" == b || "hh" == b) && 10 > a && (a = "0" + a);
	c = a + "" +
		d[b] + "" + c;
	if (g[e].count > g[b].count)
		for (a = g[b].count; a < g[e].count; a++) b = g[b].nextInterval, "ss" == b || "mm" == b || "hh" == b ? c = "00" + d[b] + "" + c : "DD" == b && (c = "0" + d[b] + "" + c);
	":" == c.charAt(c.length - 1) && (c = c.substring(0, c.length - 1));return c
};
AmCharts.formatNumber = function(a, b, c, d, e) {
	a = AmCharts.roundTo(a, b.precision);isNaN(c) && (c = b.precision);
	var f = b.decimalSeparator;
	b = b.thousandsSeparator;
	var g;
	g = 0 > a ? "-" : "";
	a = Math.abs(a);
	var h = String(a),
		k = !1;
	-1 != h.indexOf("e") && (k = !0);0 <= c && !k && (h = AmCharts.toFixed(a, c));
	var l = "";
	if (k)
		l = h;else {
		var h = h.split("."),
			k = String(h[0]),
			m;
		for (m = k.length; 0 <= m; m -= 3) l = m != k.length ? 0 !== m ? k.substring(m - 3, m) + b + l : k.substring(m - 3, m) + l : k.substring(m - 3, m);
		void 0 !== h[1] && (l = l + f + h[1]);void 0 !== c && 0 < c && "0" != l && (l = AmCharts.addZeroes(l, f, c))
	}
	l = g + l;"" === g && !0 === d && 0 !== a && (l = "+" + l);!0 === e && (l += "%");return l
};
AmCharts.addZeroes = function(a, b, c) {
	a = a.split(b);void 0 === a[1] && 0 < c && (a[1] = "0");return a[1].length < c ? (a[1] += "0", AmCharts.addZeroes(a[0] + b + a[1], b, c)) : void 0 !== a[1] ? a[0] + b + a[1] : a[0]
};
AmCharts.scientificToNormal = function(a) {
	var b;
	a = String(a).split("e");
	var c;
	if ("-" == a[1].substr(0, 1)) {
		b = "0.";
		for (c = 0; c < Math.abs(Number(a[1])) - 1; c++) b += "0";
		b += a[0].split(".").join("")
	} else {
		var d = 0;
		b = a[0].split(".");b[1] && (d = b[1].length);
		b = a[0].split(".").join("");
		for (c = 0; c < Math.abs(Number(a[1])) - d; c++) b += "0"
	}
	return b
};
AmCharts.toScientific = function(a, b) {
	if (0 === a) return "0";
	var c = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E);
	Math.pow(10, c);
	mantissa = String(mantissa).split(".").join(b);return String(mantissa) + "e" + c
};
AmCharts.randomColor = function() {
	return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6)
};
AmCharts.hitTest = function(a, b, c) {
	var d = !1,
		e = a.x,
		f = a.x + a.width,
		g = a.y,
		h = a.y + a.height,
		k = AmCharts.isInRectangle;
	d || (d = k(e, g, b));d || (d = k(e, h, b));d || (d = k(f, g, b));d || (d = k(f, h, b));d || !0 === c || (d = AmCharts.hitTest(b, a, !0));return d
};
AmCharts.isInRectangle = function(a, b, c) {
	return a >= c.x - 5 && a <= c.x + c.width + 5 && b >= c.y - 5 && b <= c.y + c.height + 5 ? !0 : !1
};
AmCharts.isPercents = function(a) {
	if (-1 != String(a).indexOf("%")) return !0
};
AmCharts.dayNames = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
AmCharts.shortDayNames = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
AmCharts.monthNames = "January February March April May June July August September October November December".split(" ");
AmCharts.shortMonthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
AmCharts.getWeekNumber = function(a) {
	a = new Date(a);a.setHours(0, 0, 0);a.setDate(a.getDate() + 4 - (a.getDay() || 7));
	var b = new Date(a.getFullYear(), 0, 1);
	return Math.ceil(((a - b) / 864E5 + 1) / 7)
};
AmCharts.formatDate = function(a, b) {
	var c,
		d,
		e,
		f,
		g,
		h,
		k,
		l,
		m = AmCharts.getWeekNumber(a);
	AmCharts.useUTC ? (c = a.getUTCFullYear(), d = a.getUTCMonth(), e = a.getUTCDate(), f = a.getUTCDay(), g = a.getUTCHours(), h = a.getUTCMinutes(), k = a.getUTCSeconds(), l = a.getUTCMilliseconds()) : (c = a.getFullYear(), d = a.getMonth(), e = a.getDate(), f = a.getDay(), g = a.getHours(), h = a.getMinutes(), k = a.getSeconds(), l = a.getMilliseconds());
	var p = String(c).substr(2, 2),
		r = d + 1;
	9 > d && (r = "0" + r);
	var n = e;
	10 > e && (n = "0" + e);
	var s = "0" + f;
	b = b.replace(/W/g, m);
	m = g;24 == m && (m = 0);
	var q = m;
	10 > q && (q = "0" + q);
	b = b.replace(/JJ/g, q);
	b = b.replace(/J/g, m);
	m = g;0 === m && (m = 24);
	q = m;10 > q && (q = "0" + q);
	b = b.replace(/HH/g, q);
	b = b.replace(/H/g, m);
	m = g;11 < m && (m -= 12);
	q = m;10 > q && (q = "0" + q);
	b = b.replace(/KK/g, q);
	b = b.replace(/K/g, m);
	m = g;0 === m && (m = 12);12 < m && (m -= 12);
	q = m;10 > q && (q = "0" + q);
	b = b.replace(/LL/g, q);
	b = b.replace(/L/g, m);
	m = h;10 > m && (m = "0" + m);
	b = b.replace(/NN/g, m);
	b = b.replace(/N/g, h);
	h = k;10 > h && (h = "0" + h);
	b = b.replace(/SS/g, h);
	b = b.replace(/S/g, k);
	k = l;10 > k && (k = "00" + k);100 > k && (k = "0" + k);
	h = l;10 > h && (h = "00" +
		h);
	b = b.replace(/QQQ/g, k);
	b = b.replace(/QQ/g, h);
	b = b.replace(/Q/g, l);
	b = 12 > g ? b.replace(/A/g, "am") : b.replace(/A/g, "pm");
	b = b.replace(/YYYY/g, "@IIII@");
	b = b.replace(/YY/g, "@II@");
	b = b.replace(/MMMM/g, "@XXXX@");
	b = b.replace(/MMM/g, "@XXX@");
	b = b.replace(/MM/g, "@XX@");
	b = b.replace(/M/g, "@X@");
	b = b.replace(/DD/g, "@RR@");
	b = b.replace(/D/g, "@R@");
	b = b.replace(/EEEE/g, "@PPPP@");
	b = b.replace(/EEE/g, "@PPP@");
	b = b.replace(/EE/g, "@PP@");
	b = b.replace(/E/g, "@P@");
	b = b.replace(/@IIII@/g, c);
	b = b.replace(/@II@/g, p);
	b = b.replace(/@XXXX@/g, AmCharts.monthNames[d]);
	b = b.replace(/@XXX@/g, AmCharts.shortMonthNames[d]);
	b = b.replace(/@XX@/g, r);
	b = b.replace(/@X@/g, d + 1);
	b = b.replace(/@RR@/g, n);
	b = b.replace(/@R@/g, e);
	b = b.replace(/@PPPP@/g, AmCharts.dayNames[f]);
	b = b.replace(/@PPP@/g, AmCharts.shortDayNames[f]);
	b = b.replace(/@PP@/g, s);return b = b.replace(/@P@/g, f)
};
AmCharts.findPosX = function(a) {
	var b = a,
		c = a.offsetLeft;
	if (a.offsetParent) {
		for (; a = a.offsetParent;) c += a.offsetLeft;
		for (; (b = b.parentNode) && b != document.body;) c -= b.scrollLeft || 0
	}
	return c
};
AmCharts.findPosY = function(a) {
	var b = a,
		c = a.offsetTop;
	if (a.offsetParent) {
		for (; a = a.offsetParent;) c += a.offsetTop;
		for (; (b = b.parentNode) && b != document.body;) c -= b.scrollTop || 0
	}
	return c
};
AmCharts.findIfFixed = function(a) {
	if (a.offsetParent)
		for (; a = a.offsetParent;)
			if ("fixed" == AmCharts.getStyle(a, "position")) return !0;
	return !1
};
AmCharts.findIfAuto = function(a) {
	return a.style && "auto" == AmCharts.getStyle(a, "overflow") ? !0 : a.parentNode ? AmCharts.findIfAuto(a.parentNode) : !1
};
AmCharts.findScrollLeft = function(a, b) {
	a.scrollLeft && (b += a.scrollLeft);return a.parentNode ? AmCharts.findScrollLeft(a.parentNode, b) : b
};
AmCharts.findScrollTop = function(a, b) {
	a.scrollTop && (b += a.scrollTop);return a.parentNode ? AmCharts.findScrollTop(a.parentNode, b) : b
};
AmCharts.formatValue = function(a, b, c, d, e, f, g, h) {
	if (b) {
		void 0 === e && (e = "");
		var k;
		for (k = 0; k < c.length; k++) {
			var l = c[k],
				m = b[l];
			void 0 !== m && (m = f ? AmCharts.addPrefix(m, h, g, d) : AmCharts.formatNumber(m, d), a = a.replace(RegExp("\\[\\[" + e + "" + l + "\\]\\]", "g"), m))
		}
	}
	return a
};
AmCharts.formatDataContextValue = function(a, b) {
	if (a) {
		var c = a.match(/\[\[.*?\]\]/g),
			d;
		for (d = 0; d < c.length; d++) {
			var e = c[d],
				e = e.substr(2, e.length - 4);
			void 0 !== b[e] && (a = a.replace(RegExp("\\[\\[" + e + "\\]\\]", "g"), b[e]))
		}
	}
	return a
};
AmCharts.massReplace = function(a, b) {
	for (var c in b)
		if (b.hasOwnProperty(c)) {
			var d = b[c];
			void 0 === d && (d = "");
			a = a.replace(c, d)
	}
	return a
};
AmCharts.cleanFromEmpty = function(a) {
	return a.replace(/\[\[[^\]]*\]\]/g, "")
};
AmCharts.addPrefix = function(a, b, c, d, e) {
	var f = AmCharts.formatNumber(a, d),
		g = "",
		h,
		k,
		l;
	if (0 === a) return "0";
	0 > a && (g = "-");
	a = Math.abs(a);
	if (1 < a)
		for (h = b.length - 1; -1 < h; h--) {
			if (a >= b[h].number && (k = a / b[h].number, l = Number(d.precision), 1 > l && (l = 1), c = AmCharts.roundTo(k, l), l = AmCharts.formatNumber(c, {
					precision : -1,
					decimalSeparator : d.decimalSeparator,
					thousandsSeparator : d.thousandsSeparator
				}), !e || k == c)) {
				f = g + "" + l + "" + b[h].prefix;break
			}
	}
	else
		for (h = 0; h < c.length; h++)
			if (a <= c[h].number) {
				k = a / c[h].number;
				l = Math.abs(Math.round(Math.log(k) * Math.LOG10E));
				k = AmCharts.roundTo(k, l);
				f = g + "" + k + "" + c[h].prefix;break
	}
	return f
};
AmCharts.remove = function(a) {
	a && a.remove()
};
AmCharts.copyProperties = function(a, b) {
	for (var c in a) a.hasOwnProperty(c) && "events" != c && void 0 !== a[c] && "function" != typeof a[c] && (b[c] = a[c])
};
AmCharts.recommended = function() {
	var a = "js";
	document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") || swfobject && swfobject.hasFlashPlayerVersion("8") && (a = "flash");return a
};
AmCharts.getEffect = function(a) {
	">" == a && (a = "easeOutSine");"<" == a && (a = "easeInSine");"elastic" == a && (a = "easeOutElastic");return a
};
AmCharts.extend = function(a, b) {
	for (var c in b) void 0 !== b[c] && (a.hasOwnProperty(c) || (a[c] = b[c]))
};
AmCharts.fixNewLines = function(a) {
	if (9 > AmCharts.IEversion && 0 < AmCharts.IEversion) {
		var b = RegExp("\\n", "g");
		a && (a = a.replace(b, "<br />"))
	}
	return a
};
AmCharts.deleteObject = function(a, b) {
	if (a) {
		if (void 0 === b || null === b)
			b = 20;
		if (0 !== b)
			if ("[object Array]" === Object.prototype.toString.call(a))
				for (var c = 0; c < a.length; c++) AmCharts.deleteObject(a[c], b - 1), a[c] = null;
			else try {
					for (c in a) a[c] && ("object" == typeof a[c] && AmCharts.deleteObject(a[c], b - 1), "function" != typeof a[c] && (a[c] = null))
				} catch (d) {}
	}
};
AmCharts.changeDate = function(a, b, c, d, e) {
	var f = -1;
	void 0 === d && (d = !0);void 0 === e && (e = !1);!0 === d && (f = 1);switch (b) {
	case "YYYY":
		a.setFullYear(a.getFullYear() + c * f);d || e || a.setDate(a.getDate() + 1);
		break;case "MM":
		a.setMonth(a.getMonth() + c * f);d || e || a.setDate(a.getDate() + 1);
		break;case "DD":
		a.setDate(a.getDate() + c * f);
		break;case "WW":
		a.setDate(a.getDate() + 7 * c * f + 1);
		break;case "hh":
		a.setHours(a.getHours() + c * f);
		break;case "mm":
		a.setMinutes(a.getMinutes() + c * f);
		break;case "ss":
		a.setSeconds(a.getSeconds() + c * f);
		break;case "fff":
		a.setMilliseconds(a.getMilliseconds() + c * f)
	}
	return a
};
AmCharts.Bezier = AmCharts.Class({
	construct : function(a, b, c, d, e, f, g, h, k, l) {
		"object" == typeof g && (g = g[0]);"object" == typeof h && (h = h[0]);
		f = {
			fill : g,
			"fill-opacity" : h,
			"stroke-width" : f
		};void 0 !== k && 0 < k && (f["stroke-dasharray"] = k);isNaN(e) || (f["stroke-opacity"] = e);d && (f.stroke = d);
		d = "M" + Math.round(b[0]) + "," + Math.round(c[0]);
		e = [];
		for (k = 0; k < b.length; k++) e.push({
				x : Number(b[k]),
				y : Number(c[k])
			});
		1 < e.length && (b = this.interpolate(e), d += this.drawBeziers(b));
		l ? d += l : AmCharts.VML || (d += "M0,0 L0,0");
		this.path = a.path(d).attr(f)
	},
	interpolate : function(a) {
		var b = [];
		b.push({
			x : a[0].x,
			y : a[0].y
		});
		var c = a[1].x - a[0].x,
			d = a[1].y - a[0].y,
			e = AmCharts.bezierX,
			f = AmCharts.bezierY;
		b.push({
			x : a[0].x + c / e,
			y : a[0].y + d / f
		});
		var g;
		for (g = 1; g < a.length - 1; g++) {
			var h = a[g - 1],
				k = a[g],
				d = a[g + 1],
				c = d.x - k.x,
				d = d.y - h.y,
				h = k.x - h.x;
			h > c && (h = c);b.push({
				x : k.x - h / e,
				y : k.y - d / f
			});b.push({
				x : k.x,
				y : k.y
			});b.push({
				x : k.x + h / e,
				y : k.y + d / f
			})
		}
		d = a[a.length - 1].y - a[a.length - 2].y;
		c = a[a.length - 1].x - a[a.length - 2].x;b.push({
			x : a[a.length - 1].x - c / e,
			y : a[a.length - 1].y - d / f
		});b.push({
			x : a[a.length - 1].x,
			y : a[a.length - 1].y
		});return b
	},
	drawBeziers : function(a) {
		var b = "",
			c;
		for (c = 0; c < (a.length - 1) / 3; c++) b += this.drawBezierMidpoint(a[3 * c], a[3 * c + 1], a[3 * c + 2], a[3 * c + 3]);
		return b
	},
	drawBezierMidpoint : function(a, b, c, d) {
		var e = Math.round,
			f = this.getPointOnSegment(a, b, 0.75),
			g = this.getPointOnSegment(d, c, 0.75),
			h = (d.x - a.x) / 16,
			k = (d.y - a.y) / 16,
			l = this.getPointOnSegment(a, b, 0.375);
		a = this.getPointOnSegment(f, g, 0.375);
		a.x -= h;
		a.y -= k;
		b = this.getPointOnSegment(g, f, 0.375);
		b.x += h;
		b.y += k;
		c = this.getPointOnSegment(d, c, 0.375);
		h = this.getMiddle(l, a);
		f = this.getMiddle(f, g);
		g = this.getMiddle(b, c);
		l = " Q" + e(l.x) + "," + e(l.y) + "," + e(h.x) + "," + e(h.y);
		l += " Q" + e(a.x) + "," + e(a.y) + "," + e(f.x) + "," + e(f.y);
		l += " Q" + e(b.x) + "," + e(b.y) + "," + e(g.x) + "," + e(g.y);return l += " Q" + e(c.x) + "," + e(c.y) + "," + e(d.x) + "," + e(d.y)
	},
	getMiddle : function(a, b) {
		return {
			x : (a.x + b.x) / 2,
			y : (a.y + b.y) / 2
		}
	},
	getPointOnSegment : function(a, b, c) {
		return {
			x : a.x + (b.x - a.x) * c,
			y : a.y + (b.y - a.y) * c
		}
	}
});
AmCharts.Cuboid = AmCharts.Class({
	construct : function(a, b, c, d, e, f, g, h, k, l, m, p, r) {
		this.set = a.set();
		this.container = a;
		this.h = Math.round(c);
		this.w = Math.round(b);
		this.dx = d;
		this.dy = e;
		this.colors = f;
		this.alpha = g;
		this.bwidth = h;
		this.bcolor = k;
		this.balpha = l;
		this.colors = f;
		r ? 0 > b && 0 === m && (m = 180) : 0 > c && 270 == m && (m = 90);
		this.gradientRotation = m;0 === d && 0 === e && (this.cornerRadius = p);this.draw()
	},
	draw : function() {
		var a = this.set;
		a.clear();
		var b = this.container,
			c = this.w,
			d = this.h,
			e = this.dx,
			f = this.dy,
			g = this.colors,
			h = this.alpha,
			k = this.bwidth,
			l = this.bcolor,
			m = this.balpha,
			p = this.gradientRotation,
			r = this.cornerRadius,
			n = g,
			s = g;
		"object" == typeof g && (n = g[0], s = g[g.length - 1]);
		var q,
			v,
			u,
			t,
			w,
			y,
			x,
			A,
			z;
		if (0 < e || 0 < f) x = s, s = AmCharts.adjustLuminosity(n, -0.2), s = AmCharts.adjustLuminosity(n, -0.2), q = AmCharts.polygon(b, [ 0, e, c + e, c, 0 ], [ 0, f, f, 0, 0 ], s, h, 0, 0, 0, p), 0 < m && (z = AmCharts.line(b, [ 0, e, c + e ], [ 0, f, f ], l, m, k)), v = AmCharts.polygon(b, [ 0, 0, c, c, 0 ], [ 0, d, d, 0, 0 ], s, h, 0, 0, 0, 0, p), v.translate(e, f), 0 < m && (u = AmCharts.line(b, [ e, e ], [ f, f + d ], l, 1, k)), t = AmCharts.polygon(b, [ 0, 0, e, e, 0 ], [ 0, d, d + f, f, 0 ], s, h, 0, 0, 0, p), w = AmCharts.polygon(b, [ c, c, c + e, c + e, c ], [ 0, d, d + f, f, 0 ], s, h, 0, 0, 0, p), 0 < m && (y = AmCharts.line(b, [ c, c + e, c + e, c ], [ 0, f, d + f, d ], l, m, k)), s = AmCharts.adjustLuminosity(x, 0.2), x = AmCharts.polygon(b, [ 0, e, c + e, c, 0 ], [ d, d + f, d + f, d, d ], s, h, 0, 0, 0, p), 0 < m && (A = AmCharts.line(b, [ 0, e, c + e ], [ d, d + f, d + f ], l, m, k));
		1 > Math.abs(d) && (d = 0);1 > Math.abs(c) && (c = 0);
		b = 0 === d ? AmCharts.line(b, [ 0, c ], [ 0, 0 ], l, m, k) : 0 === c ? AmCharts.line(b, [ 0, 0 ], [ 0, d ], l, m, k) : 0 < r ? AmCharts.rect(b, c, d, g, h, k, l, m, r, p) : AmCharts.polygon(b, [ 0, 0, c, c, 0 ], [ 0, d, d, 0, 0 ], g, h, k, l, m, p);
		d = 0 > d ? [ q, z, v, u, t, w, y, x, A, b ] : [ x, A, v, u, t, w, q, z, y, b ];
		for (q = 0; q < d.length; q++) (v = d[q]) && a.push(v)
	},
	width : function(a) {
		this.w = a;this.draw()
	},
	height : function(a) {
		this.h = a;this.draw()
	},
	animateHeight : function(a, b) {
		var c = this;
		c.easing = b;
		c.totalFrames = 1E3 * a / AmCharts.updateRate;
		c.rh = c.h;
		c.frame = 0;c.height(1);setTimeout(function() {
			c.updateHeight.call(c)
		}, AmCharts.updateRate)
	},
	updateHeight : function() {
		var a = this;
		a.frame++;
		var b = a.totalFrames;
		a.frame <= b && (b = a.easing(0, a.frame, 1, a.rh -
			1, b), a.height(b), setTimeout(function() {
			a.updateHeight.call(a)
		}, AmCharts.updateRate))
	},
	animateWidth : function(a, b) {
		var c = this;
		c.easing = b;
		c.totalFrames = 1E3 * a / AmCharts.updateRate;
		c.rw = c.w;
		c.frame = 0;c.width(1);setTimeout(function() {
			c.updateWidth.call(c)
		}, AmCharts.updateRate)
	},
	updateWidth : function() {
		var a = this;
		a.frame++;
		var b = a.totalFrames;
		a.frame <= b && (b = a.easing(0, a.frame, 1, a.rw - 1, b), a.width(b), setTimeout(function() {
			a.updateWidth.call(a)
		}, AmCharts.updateRate))
	}
});
AmCharts.AmLegend = AmCharts.Class({
	construct : function() {
		this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel");
		this.position = "bottom";
		this.borderColor = this.color = "#000000";
		this.borderAlpha = 0;
		this.markerLabelGap = 5;
		this.verticalGap = 10;
		this.align = "left";
		this.horizontalGap = 0;
		this.spacing = 10;
		this.markerDisabledColor = "#AAB3B3";
		this.markerType = "square";
		this.markerSize = 16;
		this.markerBorderThickness = 1;
		this.marginBottom = this.marginTop = 0;
		this.marginLeft = this.marginRight = 20;
		this.autoMargins = !0;
		this.valueWidth = 50;
		this.switchable = !0;
		this.switchType = "x";
		this.switchColor = "#FFFFFF";
		this.rollOverColor = "#CC0000";
		this.reversedOrder = !1;
		this.labelText = "[[title]]";
		this.valueText = "[[value]]";
		this.useMarkerColorForLabels = !1;
		this.rollOverGraphAlpha = 1;
		this.textClickEnabled = !1;
		this.equalWidths = !0;
		this.dateFormat = "DD-MM-YYYY";
		this.backgroundColor = "#FFFFFF";
		this.backgroundAlpha = 0;
		this.showEntries = !0
	},
	setData : function(a) {
		this.data = a;this.invalidateSize()
	},
	invalidateSize : function() {
		this.destroy();
		this.entries = [];
		this.valueLabels = [];AmCharts.ifArray(this.data) && this.drawLegend()
	},
	drawLegend : function() {
		var a = this.chart,
			b = this.position,
			c = this.width,
			d = a.divRealWidth,
			e = a.divRealHeight,
			f = this.div,
			g = this.data;
		isNaN(this.fontSize) && (this.fontSize = a.fontSize);
		if ("right" == b || "left" == b) this.maxColumns = 1, this.marginLeft = this.marginRight = 10;
		else if (this.autoMargins) {
			this.marginRight = a.marginRight;
			this.marginLeft = a.marginLeft;
			var h = a.autoMarginOffset;
			"bottom" == b ? (this.marginBottom = h, this.marginTop = 0) : (this.marginTop = h, this.marginBottom = 0)
		}
		c = void 0 !== c ? AmCharts.toCoordinate(c, d) : a.realWidth;
		"outside" == b ? (c = f.offsetWidth, e = f.offsetHeight, f.clientHeight && (c = f.clientWidth, e = f.clientHeight)) : (f.style.width = c + "px", f.className = "amChartsLegend");
		this.divWidth = c;
		this.container = new AmCharts.AmDraw(f, c, e);
		this.lx = 0;
		this.ly = 8;
		b = this.markerSize;b > this.fontSize && (this.ly = b / 2 - 1);0 < b && (this.lx += b + this.markerLabelGap);
		this.titleWidth = 0;
		if (b = this.title) a = AmCharts.text(this.container, b, this.color, a.fontFamily, this.fontSize, "start", !0), a.translate(this.marginLeft, this.marginTop + this.verticalGap + this.ly + 1), a = a.getBBox(), this.titleWidth = a.width + 15, this.titleHeight = a.height + 6;
		this.index = this.maxLabelWidth = 0;
		if (this.showEntries) {
			for (a = 0; a < g.length; a++) this.createEntry(g[a]);
			for (a = this.index = 0; a < g.length; a++) this.createValue(g[a])
		}
		this.arrangeEntries();this.updateValues()
	},
	arrangeEntries : function() {
		var a = this.position,
			b = this.marginLeft + this.titleWidth,
			c = this.marginRight,
			d = this.marginTop,
			e = this.marginBottom,
			f = this.horizontalGap,
			g = this.div,
			h = this.divWidth,
			k = this.maxColumns,
			l = this.verticalGap,
			m = this.spacing,
			p = h - c - b,
			r = 0,
			n = 0,
			s = this.container,
			q = s.set();
		this.set = q;
		s = s.set();q.push(s);
		var v = this.entries,
			u,
			t;
		for (t = 0; t < v.length; t++) {
			u = v[t].getBBox();var w = u.width;
			w > r && (r = w);
			u = u.height;u > n && (n = u)
		}
		var y = w = 0,
			x = f;
		for (t = 0; t < v.length; t++) {
			var A = v[t];
			this.reversedOrder && (A = v[v.length - t - 1]);
			u = A.getBBox();var z;
			this.equalWidths ? z = f + y * (r + m + this.markerLabelGap) : (z = x, x = x + u.width + f + m);z + u.width > p && 0 < t && 0 !== y && (w++, y = 0, z = f, x = z + u.width + f + m, skipNewRow = !0);A.translate(z, (n + l) * w);y++;!isNaN(k) && y >= k && (y = 0, w++);s.push(A)
		}
		u = s.getBBox();
		k = u.height + 2 * l - 1;
		"left" == a || "right" == a ? (h = u.width + 2 * f, g.style.width = h + b + c + "px") : h = h - b - c - 1;
		c = AmCharts.polygon(this.container, [ 0, h, h, 0 ], [ 0, 0, k, k ], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);q.push(c);q.translate(b, d);c.toBack();
		b = f;
		if ("top" == a || "bottom" == a || "absolute" == a || "outside" == a)
			"center" == this.align ? b = f + (h - u.width) / 2 : "right" == this.align && (b = f + h - u.width);
		s.translate(b, l + 1);this.titleHeight > k && (k = this.titleHeight);
		a = k + d + e + 1;0 > a && (a = 0);
		g.style.height = Math.round(a) + "px"
	},
	createEntry : function(a) {
		if (!1 !== a.visibleInLegend) {
			var b = this.chart,
				c = a.markerType;
			c || (c = this.markerType);
			var d = a.color,
				e = a.alpha;
			a.legendKeyColor && (d = a.legendKeyColor());a.legendKeyAlpha && (e = a.legendKeyAlpha());!0 === a.hidden && (d = this.markerDisabledColor);
			var f = this.createMarker(c, d, e);
			this.addListeners(f, a);
			e = this.container.set([ f ]);this.switchable && e.setAttr("cursor", "pointer");
			var g = this.switchType,
				h;
			g && (h = "x" == g ? this.createX() : this.createV(), h.dItem = a, !0 !== a.hidden ? "x" == g ? h.hide() : h.show() : "x" != g && h.hide(), this.switchable || h.hide(), this.addListeners(h, a), a.legendSwitch = h, e.push(h));
			g = this.color;a.showBalloon && this.textClickEnabled && void 0 !== this.selectedColor && (g = this.selectedColor);this.useMarkerColorForLabels && (g = d);!0 === a.hidden && (g = this.markerDisabledColor);
			var d = AmCharts.massReplace(this.labelText, {
					"[[title]]" : a.title
				}),
				k = this.fontSize,
				l = this.markerSize;
			if (f && l <= k) {
				var m = 0;
				if ("bubble" == c || "circle" == c)
					m = l / 2;
				c = m + this.ly - k / 2 + (k + 2 - l) / 2;f.translate(m, c);h && h.translate(m, c)
			}
			var p;
			d && (d = AmCharts.fixNewLines(d), p = AmCharts.text(this.container, d, g, b.fontFamily, k, "start"), p.translate(this.lx, this.ly), e.push(p), b = p.getBBox().width, this.maxLabelWidth < b && (this.maxLabelWidth = b));
			this.entries[this.index] = e;
			a.legendEntry = this.entries[this.index];
			a.legendLabel = p;this.index++
		}
	},
	addListeners : function(a, b) {
		var c = this;
		a && a.mouseover(function() {
			c.rollOverMarker(b)
		}).mouseout(function() {
			c.rollOutMarker(b)
		}).click(function() {
			c.clickMarker(b)
		})
	},
	rollOverMarker : function(a) {
		this.switchable && this.dispatch("rollOverMarker", a);this.dispatch("rollOverItem", a)
	},
	rollOutMarker : function(a) {
		this.switchable && this.dispatch("rollOutMarker", a);this.dispatch("rollOutItem", a)
	},
	clickMarker : function(a) {
		this.switchable ? !0 === a.hidden ? this.dispatch("showItem", a) : this.dispatch("hideItem", a) : this.textClickEnabled && this.dispatch("clickMarker", a)
	},
	rollOverLabel : function(a) {
		a.hidden || (this.textClickEnabled && a.legendLabel && a.legendLabel.attr({
			fill : this.rollOverColor
		}), this.dispatch("rollOverItem", a))
	},
	rollOutLabel : function(a) {
		if (!a.hidden) {
			if (this.textClickEnabled && a.legendLabel) {
				var b = this.color;
				void 0 !== this.selectedColor && a.showBalloon && (b = this.selectedColor);this.useMarkerColorForLabels && (b = a.lineColor, void 0 === b && (b = a.color));a.legendLabel.attr({
					fill : b
				})
			}
			this.dispatch("rollOutItem", a)
		}
	},
	clickLabel : function(a) {
		this.textClickEnabled ? a.hidden || this.dispatch("clickLabel", a) : this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a) : this.dispatch("hideItem", a))
	},
	dispatch : function(a, b) {
		this.fire(a, {
			type : a,
			dataItem : b,
			target : this,
			chart : this.chart
		})
	},
	createValue : function(a) {
		var b = this,
			c = b.fontSize;
		if (!1 !== a.visibleInLegend) {
			var d = b.maxLabelWidth;
			b.equalWidths || (b.valueAlign = "left");"left" == b.valueAlign && (d = a.legendEntry.getBBox().width);
			var e = d;
			if (b.valueText) {
				var f = b.color;
				b.useMarkerColorForValues && (f = a.color, a.legendKeyColor && (f = a.legendKeyColor()));!0 === a.hidden && (f = b.markerDisabledColor);
				var g = b.valueText,
					d = d + b.lx + b.markerLabelGap + b.valueWidth,
					h = "end";
				"left" == b.valueAlign && (d -= b.valueWidth, h = "start");
				f = AmCharts.text(b.container, g, f, b.chart.fontFamily, c, h);f.translate(d, b.ly);b.entries[b.index].push(f);
				e += b.valueWidth + 2 * b.markerLabelGap;
				f.dItem = a;b.valueLabels.push(f)
			}
			b.index++;
			f = b.markerSize;f < c + 7 && (f = c + 7, AmCharts.VML && (f += 3));
			c = b.container.rect(b.markerSize, 0, e, f, 0, 0).attr({
				stroke : "none",
				fill : "#ffffff",
				"fill-opacity" : 0.005
			});
			c.dItem = a;b.entries[b.index - 1].push(c);c.mouseover(function() {
				b.rollOverLabel(a)
			}).mouseout(function() {
				b.rollOutLabel(a)
			}).click(function() {
				b.clickLabel(a)
			})
		}
	},
	createV : function() {
		var a = this.markerSize;
		return AmCharts.polygon(this.container, [ a / 5, a / 2, a - a / 5, a / 2 ], [ a / 3, a - a / 5, a / 5, a / 1.7 ], this.switchColor)
	},
	createX : function() {
		var a = this.markerSize - 3,
			b = {
				stroke : this.switchColor,
				"stroke-width" : 3
			},
			c = this.container,
			d = AmCharts.line(c, [ 3, a ], [ 3, a ]).attr(b),
			a = AmCharts.line(c, [ 3, a ], [ a, 3 ]).attr(b);
		return this.container.set([ d, a ])
	},
	createMarker : function(a, b, c) {
		var d = this.markerSize,
			e = this.container,
			f,
			g = this.markerBorderColor;
		g || (g = b);
		var h = this.markerBorderThickness,
			k = this.markerBorderAlpha;
		switch (a) {
		case "square":
			f = AmCharts.polygon(e, [ 0, d, d, 0 ], [ 0, 0, d, d ], b, c, h, g, k);
			break;case "circle":
			f = AmCharts.circle(e, d / 2, b, c, h, g, k);f.translate(d / 2, d / 2);
			break;case "line":
			f = AmCharts.line(e, [ 0, d ], [ d / 2, d / 2 ], b, c, h);
			break;case "dashedLine":
			f = AmCharts.line(e, [ 0, d ], [ d / 2, d / 2 ], b, c, h, 3);
			break;case "triangleUp":
			f = AmCharts.polygon(e, [ 0, d / 2, d, d ], [ d, 0, d, d ], b, c, h, g, k);
			break;case "triangleDown":
			f = AmCharts.polygon(e, [ 0, d / 2, d, d ], [ 0, d, 0, 0 ], b, c, h, g, k);
			break;case "bubble":
			f = AmCharts.circle(e, d / 2, b, c, h, g, k, !0), f.translate(d / 2, d / 2)
		}
		return f
	},
	validateNow : function() {
		this.invalidateSize()
	},
	updateValues : function() {
		var a = this.valueLabels,
			b = this.chart,
			c;
		for (c = 0; c < a.length; c++) {
			var d = a[c],
				e = d.dItem;
			if (void 0 !== e.type) {
				var f = e.currentDataItem;
				if (f) {
					var g = this.valueText;
					e.legendValueText && (g = e.legendValueText);
					e = g;
					e = b.formatString(e, f);d.text(e)
				} else d.text(" ")
			} else f = b.formatString(this.valueText, e), d.text(f)
		}
	},
	renderFix : function() {
		if (!AmCharts.VML) {
			var a = this.container;
			a && a.renderFix()
		}
	},
	destroy : function() {
		this.div.innerHTML = "";AmCharts.remove(this.set)
	}
});
AmCharts.AmBalloon = AmCharts.Class({
	construct : function() {
		this.enabled = !0;
		this.fillColor = "#CC0000";
		this.fillAlpha = 1;
		this.borderThickness = 2;
		this.borderColor = "#FFFFFF";
		this.borderAlpha = 1;
		this.cornerRadius = 6;
		this.maximumWidth = 220;
		this.horizontalPadding = 8;
		this.verticalPadding = 5;
		this.pointerWidth = 10;
		this.pointerOrientation = "V";
		this.color = "#FFFFFF";
		this.textShadowColor = "#000000";
		this.adjustBorderColor = !1;
		this.showBullet = !0;
		this.show = this.follow = !1;
		this.bulletSize = 3;
		this.textAlign = "middle"
	},
	draw : function() {
		var a = this.pointToX,
			b = this.pointToY,
			c = this.textAlign;
		if (!isNaN(a)) {
			var d = this.chart,
				e = d.container,
				f = this.set;
			AmCharts.remove(f);AmCharts.remove(this.pointer);
			this.set = f = e.set();d.balloonsSet.push(f);
			if (this.show) {
				var g = this.l,
					h = this.t,
					k = this.r,
					l = this.b,
					m = this.textShadowColor;
				this.color == m && (m = void 0);
				var p = this.balloonColor,
					r = this.fillColor,
					n = this.borderColor;
				void 0 != p && (this.adjustBorderColor ? n = p : r = p);
				var s = this.horizontalPadding,
					p = this.verticalPadding,
					q = this.pointerWidth,
					v = this.pointerOrientation,
					u = this.cornerRadius,
					t = d.fontFamily,
					w = this.fontSize;
				void 0 == w && (w = d.fontSize);
				d = AmCharts.text(e, this.text, this.color, t, w, c);f.push(d);
				var y;
				void 0 != m && (y = AmCharts.text(e, this.text, m, t, w, c, !1, 0.4), f.push(y));
				t = d.getBBox();
				m = t.height + 2 * p;
				t = t.width + 2 * s;window.opera && (m += 2);
				var x,
					w = w / 2 + p;
				switch (c) {
				case "middle":
					x = t / 2;
					break;case "left":
					x = s;
					break;case "right":
					x = t - s
				}
				d.translate(x, w);y && y.translate(x + 1, w + 1);
				"H" != v ? (x = a - t / 2, c = b < h + m + 10 && "down" != v ? b + q : b - m - q) : (2 * q > m && (q = m / 2), c = b - m / 2, x = a < g + (k - g) / 2 ? a + q : a - t - q);c + m >= l && (c = l - m);c < h && (c = h);x < g && (x = g);x + t > k && (x = k - t);
				0 < u || 0 === q ? (n = AmCharts.rect(e, t, m, r, this.fillAlpha, this.borderThickness, n, this.borderAlpha, this.cornerRadius), this.showBullet && (e = AmCharts.circle(e, this.bulletSize, r, this.fillAlpha), e.translate(a, b), this.pointer = e)) : (l = [], u = [], "H" != v ? (g = a - x, g > t - q && (g = t - q), g < q && (g = q), l = [ 0, g - q, a - x, g + q, t, t, 0, 0 ], u = b < h + m + 10 && "down" != v ? [ 0, 0, b - c, 0, 0, m, m, 0 ] : [ m, m, b - c, m, m, 0, 0, m ]) : (h = b - c, h > m - q && (h = m - q), h < q && (h = q), u = [ 0, h - q, b - c, h + q, m, m, 0, 0 ], l = a < g + (k - g) / 2 ? [ 0, 0, x < a ? 0 : a - x, 0, 0, t, t, 0 ] : [ t, t, x + t > a ? t : a -
				x, t, t, 0, 0, t ]), n = AmCharts.polygon(e, l, u, r, this.fillAlpha, this.borderThickness, n, this.borderAlpha));f.push(n);n.toFront();y && y.toFront();d.toFront();
				a = 1;9 > AmCharts.IEversion && this.follow && (a = 6);f.translate(x - a, c);
				f = d.getBBox();
				this.bottom = c + f.y + f.height + 2 * p + 2;
				this.yPos = f.y + c
			}
		}
	},
	followMouse : function() {
		if (this.follow && this.show) {
			var a = this.chart.mouseX,
				b = this.chart.mouseY - 3;
			this.pointToX = a;
			this.pointToY = b;
			if (a != this.previousX || b != this.previousY)
				if (this.previousX = a, this.previousY = b, 0 === this.cornerRadius) this.draw();else {
					var c = this.set;
					if (c) {
						var d = c.getBBox(),
							a = a - d.width / 2,
							e = b - d.height - 10;
						a < this.l && (a = this.l);a > this.r - d.width && (a = this.r - d.width);e < this.t && (e = b + 10);c.translate(a, e)
					}
			}
		}
	},
	changeColor : function(a) {
		this.balloonColor = a
	},
	setBounds : function(a, b, c, d) {
		this.l = a;
		this.t = b;
		this.r = c;
		this.b = d
	},
	showBalloon : function(a) {
		this.text = a;
		this.show = !0;this.draw()
	},
	hide : function() {
		this.follow = this.show = !1;this.destroy()
	},
	setPosition : function(a, b, c) {
		this.pointToX = a;
		this.pointToY = b;c && (a == this.previousX && b == this.previousY || this.draw());
		this.previousX = a;
		this.previousY = b
	},
	followCursor : function(a) {
		var b = this;
		(b.follow = a) ? (b.pShowBullet = b.showBullet, b.showBullet = !1) : void 0 !== b.pShowBullet && (b.showBullet = b.pShowBullet);clearInterval(b.interval);
		var c = b.chart.mouseX,
			d = b.chart.mouseY;
		!isNaN(c) && a && (b.pointToX = c, b.pointToY = d - 3, b.interval = setInterval(function() {
			b.followMouse.call(b)
		}, 40))
	},
	destroy : function() {
		clearInterval(this.interval);AmCharts.remove(this.set);
		this.set = null;AmCharts.remove(this.pointer);
		this.pointer = null
	}
});
AmCharts.AmCoordinateChart = AmCharts.Class({
	inherits : AmCharts.AmChart,
	construct : function() {
		AmCharts.AmCoordinateChart.base.construct.call(this);this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem", "clickGraph");
		this.plotAreaFillColors = "#FFFFFF";
		this.plotAreaFillAlphas = 0;
		this.plotAreaBorderColor = "#000000";
		this.plotAreaBorderAlpha = 0;
		this.startAlpha = 1;
		this.startDuration = 0;
		this.startEffect = "elastic";
		this.sequencedAnimation = !0;
		this.colors = "#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
		this.balloonDateFormat = "MMM DD, YYYY";
		this.valueAxes = [];
		this.graphs = []
	},
	initChart : function() {
		AmCharts.AmCoordinateChart.base.initChart.call(this);this.createValueAxes();AmCharts.VML && (this.startAlpha = 1);
		var a = this.legend;
		a && a.setData(this.graphs)
	},
	createValueAxes : function() {
		if (0 === this.valueAxes.length) {
			var a = new AmCharts.ValueAxis;
			this.addValueAxis(a)
		}
	},
	parseData : function() {
		this.processValueAxes();this.processGraphs()
	},
	parseSerialData : function() {
		AmCharts.AmSerialChart.base.parseData.call(this);
		var a = this.graphs,
			b,
			c = {},
			d = this.seriesIdField;
		d || (d = this.categoryField);
		this.chartData = [];
		var e = this.dataProvider;
		if (e) {
			var f = !1,
				g,
				h = this.categoryAxis,
				k;
			h && (f = h.parseDates, k = h.forceShowField, g = h.categoryFunction);
			var l,
				m;
			f && (b = AmCharts.extractPeriod(h.minPeriod), l = b.period, m = b.count);
			var p = {};
			this.lookupTable = p;
			var r;
			for (r = 0; r < e.length; r++) {
				var n = {},
					s = e[r];
				b = s[this.categoryField];
				n.category = g ? g(b, s, h) : String(b);k && (n.forceShow = s[k]);
				p[s[d]] = n;f && (b = h.categoryFunction ? h.categoryFunction(b, s, h) : b instanceof Date ? "fff" == h.minPeriod ? AmCharts.useUTC ? new Date(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate(), b.getUTCHours(), b.getUTCMinutes(), b.getUTCSeconds(), b.getUTCMilliseconds()) : new Date(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds(), b.getMilliseconds()) : new Date(b) : new Date(b), b = AmCharts.resetDateToMin(b, l, m), n.category = b, n.time = b.getTime());var q = this.valueAxes;
				n.axes = {};
				n.x = {};var v;
				for (v = 0; v < q.length; v++) {
					var u = q[v].id;
					n.axes[u] = {};
					n.axes[u].graphs = {};var t;
					for (t = 0; t < a.length; t++) {
						b = a[t];var w = b.id,
							y = b.periodValue;
						if (b.valueAxis.id == u) {
							n.axes[u].graphs[w] = {};
							var x = {};
							x.index = r;
							var A = s;
							b.dataProvider && (A = c);
							x.values = this.processValues(A, b, y);this.processFields(b, x, A);
							x.category = n.category;
							x.serialDataItem = n;
							x.graph = b;
							n.axes[u].graphs[w] = x
						}
					}
				}
				this.chartData[r] = n
			}
		}
		for (c = 0; c < a.length; c++) b = a[c], b.dataProvider && this.parseGraphData(b)
	},
	processValues : function(a, b, c) {
		var d = {},
			e,
			f = !1;
		"candlestick" != b.type && "ohlc" != b.type || "" === c || (f = !0);
		e = Number(a[b.valueField + c]);isNaN(e) || (d.value = e);f && (c = "Open");
		e = Number(a[b.openField + c]);isNaN(e) || (d.open = e);f && (c = "Close");
		e = Number(a[b.closeField + c]);isNaN(e) || (d.close = e);f && (c = "Low");
		e = Number(a[b.lowField + c]);isNaN(e) || (d.low = e);f && (c = "High");
		e = Number(a[b.highField + c]);isNaN(e) || (d.high = e);return d
	},
	parseGraphData : function(a) {
		var b = a.dataProvider,
			c = a.seriesIdField;
		c || (c = this.seriesIdField);c || (c = this.categoryField);
		var d;
		for (d = 0; d < b.length; d++) {
			var e = b[d],
				f = this.lookupTable[String(e[c])],
				g = a.valueAxis.id;
			f && (g = f.axes[g].graphs[a.id], g.serialDataItem = f, g.values = this.processValues(e, a, a.periodValue), this.processFields(a, g, e))
		}
	},
	addValueAxis : function(a) {
		a.chart = this;this.valueAxes.push(a);this.validateData()
	},
	removeValueAxesAndGraphs : function() {
		var a = this.valueAxes,
			b;
		for (b = a.length - 1; -1 < b; b--) this.removeValueAxis(a[b])
	},
	removeValueAxis : function(a) {
		var b = this.graphs,
			c;
		for (c = b.length - 1; 0 <= c; c--) {
			var d = b[c];
			d && d.valueAxis == a && this.removeGraph(d)
		}
		b = this.valueAxes;
		for (c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1);
		this.validateData()
	},
	addGraph : function(a) {
		this.graphs.push(a);this.chooseGraphColor(a, this.graphs.length - 1);this.validateData()
	},
	removeGraph : function(a) {
		var b = this.graphs,
			c;
		for (c = b.length - 1; 0 <= c; c--) b[c] == a && (b.splice(c, 1), a.destroy());
		this.validateData()
	},
	processValueAxes : function() {
		var a = this.valueAxes,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			c.chart = this;c.id || (c.id = "valueAxis" + b + "_" + (new Date).getTime());
			if (!0 === this.usePrefixes || !1 === this.usePrefixes)
				c.usePrefixes = this.usePrefixes
		}
	},
	processGraphs : function() {
		var a = this.graphs,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			c.chart = this;c.valueAxis || (c.valueAxis = this.valueAxes[0]);c.id || (c.id = "graph" + b + "_" + (new Date).getTime())
		}
	},
	formatString : function(a, b) {
		var c = b.graph,
			d = c.valueAxis;
		d.duration && b.values.value && (d = AmCharts.formatDuration(b.values.value, d.duration, "", d.durationUnits, d.maxInterval, d.numberFormatter), a = a.split("[[value]]").join(d));
		a = AmCharts.massReplace(a, {
			"[[title]]" : c.title,
			"[[description]]" : b.description,
			"<br>" : "\n"
		});
		a = AmCharts.fixNewLines(a);return a = AmCharts.cleanFromEmpty(a)
	},
	getBalloonColor : function(a, b) {
		var c = a.lineColor,
			d = a.balloonColor,
			e = a.fillColors;
		"object" == typeof e ? c = e[0] : void 0 !== e && (c = e);
		if (b.isNegative) {
			var e = a.negativeLineColor,
				f = a.negativeFillColors;
			"object" == typeof f ? e = f[0] : void 0 !== f && (e = f);void 0 !== e && (c = e)
		}
		void 0 !== b.color && (c = b.color);void 0 === d && (d = c);return d
	},
	getGraphById : function(a) {
		return this.getObjById(this.graphs, a)
	},
	getValueAxisById : function(a) {
		return this.getObjById(this.valueAxes, a)
	},
	getObjById : function(a, b) {
		var c,
			d;
		for (d = 0; d < a.length; d++) {
			var e = a[d];
			e.id == b && (c = e)
		}
		return c
	},
	processFields : function(a, b, c) {
		if (a.itemColors) {
			var d = a.itemColors,
				e = b.index;
			b.color = e < d.length ? d[e] : AmCharts.randomColor()
		}
		d = "lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor".split(" ");
		for (e = 0; e < d.length; e++) {
			var f = d[e],
				g = a[f + "Field"];
			g && (g = c[g], AmCharts.isDefined(g) && (b[f] = g))
		}
		b.dataContext = c
	},
	chooseGraphColor : function(a, b) {
		if (void 0 === a.lineColor) {
			var c;
			c = this.colors.length > b ? this.colors[b] : AmCharts.randomColor();
			a.lineColor = c
		}
	},
	handleLegendEvent : function(a) {
		var b = a.type;
		if (a = a.dataItem) {
			var c = a.hidden,
				d = a.showBalloon;
			switch (b) {
			case "clickMarker":
				d ? this.hideGraphsBalloon(a) : this.showGraphsBalloon(a);
				break;case "clickLabel":
				d ? this.hideGraphsBalloon(a) : this.showGraphsBalloon(a);
				break;case "rollOverItem":
				c || this.highlightGraph(a);
				break;case "rollOutItem":
				c || this.unhighlightGraph();
				break;case "hideItem":
				this.hideGraph(a);
				break;case "showItem":
				this.showGraph(a)
			}
		}
	},
	highlightGraph : function(a) {
		var b = this.graphs,
			c,
			d = 0.2;
		this.legend && (d = this.legend.rollOverGraphAlpha);
		if (1 != d)
			for (c = 0; c < b.length; c++) {
				var e = b[c];
				e != a && e.changeOpacity(d)
		}
	},
	unhighlightGraph : function() {
		var a;
		this.legend && (a = this.legend.rollOverGraphAlpha);
		if (1 != a) {
			a = this.graphs;
			var b;
			for (b = 0; b < a.length; b++) a[b].changeOpacity(1)
		}
	},
	showGraph : function(a) {
		a.hidden = !1;
		this.dataChanged = !0;
		this.marginsUpdated = !1;this.chartCreated && this.initChart()
	},
	hideGraph : function(a) {
		this.dataChanged = !0;
		this.marginsUpdated = !1;
		a.hidden = !0;this.chartCreated && this.initChart()
	},
	hideGraphsBalloon : function(a) {
		a.showBalloon = !1;this.updateLegend()
	},
	showGraphsBalloon : function(a) {
		a.showBalloon = !0;this.updateLegend()
	},
	updateLegend : function() {
		this.legend && this.legend.invalidateSize()
	},
	resetAnimation : function() {
		var a = this.graphs;
		if (a) {
			var b;
			for (b = 0; b < a.length; b++) a[b].animationPlayed = !1
		}
	},
	animateAgain : function() {
		this.resetAnimation();this.validateNow()
	}
});
AmCharts.AmRectangularChart = AmCharts.Class({
	inherits : AmCharts.AmCoordinateChart,
	construct : function() {
		AmCharts.AmRectangularChart.base.construct.call(this);this.createEvents("zoomed");
		this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 20;
		this.verticalPosition = this.horizontalPosition = this.depth3D = this.angle = 0;
		this.heightMultiplier = this.widthMultiplier = 1;
		this.zoomOutText = "Show all";
		this.zoomOutButton = {
			backgroundColor : "#b2e1ff",
			backgroundAlpha : 1
		};
		this.trendLines = [];
		this.autoMargins = !0;
		this.marginsUpdated = !1;
		this.autoMarginOffset = 10
	},
	initChart : function() {
		AmCharts.AmRectangularChart.base.initChart.call(this);this.updateDxy();
		var a = !0;
		!this.marginsUpdated && this.autoMargins && (this.resetMargins(), a = !1);this.updateMargins();this.updatePlotArea();this.updateScrollbars();this.updateTrendLines();this.updateChartCursor();this.updateValueAxes();a && (this.scrollbarOnly || this.updateGraphs())
	},
	drawChart : function() {
		AmCharts.AmRectangularChart.base.drawChart.call(this);this.drawPlotArea();
		if (AmCharts.ifArray(this.chartData)) {
			var a = this.chartCursor;
			a && a.draw();
			a = this.zoomOutText;"" !== a && a && this.drawZoomOutButton()
		}
	},
	resetMargins : function() {
		var a = {},
			b;
		if ("serial" == this.chartType) {
			var c = this.valueAxes;
			for (b = 0; b < c.length; b++) {
				var d = c[b];
				d.ignoreAxisWidth || (d.setOrientation(this.rotate), d.fixAxisPosition(), a[d.position] = !0)
			}
			(b = this.categoryAxis) && !b.ignoreAxisWidth && (b.setOrientation(!this.rotate), b.fixAxisPosition(), b.fixAxisPosition(), a[b.position] = !0)
		} else {
			d = this.xAxes;
			c = this.yAxes;
			for (b = 0; b < d.length; b++) {
				var e = d[b];
				e.ignoreAxisWidth || (e.setOrientation(!0), e.fixAxisPosition(), a[e.position] = !0)
			}
			for (b = 0; b < c.length; b++) d = c[b], d.ignoreAxisWidth || (d.setOrientation(!1), d.fixAxisPosition(), a[d.position] = !0)
		}
		a.left && (this.marginLeft = 0);a.right && (this.marginRight = 0);a.top && (this.marginTop = 0);a.bottom && (this.marginBottom = 0);
		this.fixMargins = a
	},
	measureMargins : function() {
		var a = this.valueAxes,
			b,
			c = this.autoMarginOffset,
			d = this.fixMargins,
			e = this.realWidth,
			f = this.realHeight,
			g = c,
			h = c,
			k = e - c;
		b = f - c;
		var l;
		for (l = 0; l < a.length; l++) b = this.getAxisBounds(a[l], g, k, h, b), g = b.l, k = b.r, h = b.t, b = b.b;
		if (a = this.categoryAxis) b = this.getAxisBounds(a, g, k, h, b), g = b.l, k = b.r, h = b.t, b = b.b;
		d.left && g < c && (this.marginLeft = Math.round(-g + c));d.right && k > e - c && (this.marginRight = Math.round(k - e + c));d.top && h < c + this.titleHeight && (this.marginTop = Math.round(this.marginTop - h + c + this.titleHeight));d.bottom && b > f - c && (this.marginBottom = Math.round(b - f + c));this.initChart()
	},
	getAxisBounds : function(a, b, c, d, e) {
		if (!a.ignoreAxisWidth) {
			var f = a.labelsSet,
				g = a.tickLength;
			a.inside && (g = 0);
			if (f) switch (f = a.getBBox(), a.position) {
				case "top":
					a = f.y;d > a && (d = a);
					break;case "bottom":
					a = f.y + f.height;e < a && (e = a);
					break;case "right":
					a = f.x + f.width + g + 3;c < a && (c = a);
					break;case "left":
					a = f.x - g, b > a && (b = a)
			}
		}
		return {
			l : b,
			t : d,
			r : c,
			b : e
		}
	},
	drawZoomOutButton : function() {
		var a = this,
			b = a.container.set();
		a.zoomButtonSet.push(b);
		var c = a.color,
			d = a.fontSize,
			e = a.zoomOutButton;
		e && (e.fontSize && (d = e.fontSize), e.color && (c = e.color));
		c = AmCharts.text(a.container, a.zoomOutText, c, a.fontFamily, d, "start");
		d = c.getBBox();c.translate(29, 6 + d.height / 2);
		e = AmCharts.rect(a.container, d.width + 40, d.height + 15, e.backgroundColor, e.backgroundAlpha);b.push(e);
		a.zbBG = e;void 0 !== a.pathToImages && (e = a.container.image(a.pathToImages + "lens.png", 0, 0, 16, 16), e.translate(7, d.height / 2 - 1), e.toFront(), b.push(e));c.toFront();b.push(c);
		e = b.getBBox();b.translate(a.marginLeftReal + a.plotAreaWidth - e.width, a.marginTopReal);b.hide();b.mouseover(function() {
			a.rollOverZB()
		}).mouseout(function() {
			a.rollOutZB()
		}).click(function() {
			a.clickZB()
		}).touchstart(function() {
			a.rollOverZB()
		}).touchend(function() {
			a.rollOutZB();a.clickZB()
		});
		for (e = 0; e < b.length; e++) b[e].attr({
				cursor : "pointer"
			});
		a.zbSet = b
	},
	rollOverZB : function() {
		this.zbBG.show()
	},
	rollOutZB : function() {
		this.zbBG.hide()
	},
	clickZB : function() {
		this.zoomOut()
	},
	zoomOut : function() {
		this.updateScrollbar = !0;this.zoom()
	},
	drawPlotArea : function() {
		var a = this.dx,
			b = this.dy,
			c = this.marginLeftReal,
			d = this.marginTopReal,
			e = this.plotAreaWidth - 1,
			f = this.plotAreaHeight - 1,
			g = this.plotAreaFillColors,
			h = this.plotAreaFillAlphas,
			k = this.plotAreaBorderColor,
			l = this.plotAreaBorderAlpha;
		this.trendLinesSet.clipRect(c, d, e, f);"object" == typeof h && (h = h[0]);
		g = AmCharts.polygon(this.container, [ 0, e, e, 0 ], [ 0, 0, f, f ], g, h, 1, k, l, this.plotAreaGradientAngle);g.translate(c + a, d + b);g.node.setAttribute("class", "amChartsPlotArea");this.set.push(g);0 !== a && 0 !== b && (g = this.plotAreaFillColors, "object" == typeof g && (g = g[0]), g = AmCharts.adjustLuminosity(g, -0.15), e = AmCharts.polygon(this.container, [ 0, a, e + a, e, 0 ], [ 0, b, b, 0, 0 ], g, h, 1, k, l), e.translate(c, d + f), this.set.push(e), a = AmCharts.polygon(this.container, [ 0, 0, a, a, 0 ], [ 0, f, f + b, b, 0 ], g, h, 1, k, l), a.translate(c, d), this.set.push(a))
	},
	updatePlotArea : function() {
		var a = this.updateWidth(),
			b = this.updateHeight(),
			c = this.container;
		this.realWidth = a;
		this.realWidth = b;c && this.container.setSize(a, b);
		a = a - this.marginLeftReal - this.marginRightReal - this.dx;
		b = b - this.marginTopReal - this.marginBottomReal;1 > a && (a = 1);1 > b && (b = 1);
		this.plotAreaWidth = Math.round(a);
		this.plotAreaHeight = Math.round(b)
	},
	updateDxy : function() {
		this.dx = Math.round(this.depth3D * Math.cos(this.angle * Math.PI / 180));
		this.dy = Math.round(-this.depth3D * Math.sin(this.angle * Math.PI / 180));
		this.d3x = Math.round(this.columnSpacing3D * Math.cos(this.angle * Math.PI / 180));
		this.d3y = Math.round(-this.columnSpacing3D * Math.sin(this.angle * Math.PI / 180))
	},
	updateMargins : function() {
		var a = this.getTitleHeight();
		this.titleHeight = a;
		this.marginTopReal = this.marginTop - this.dy + a;
		this.marginBottomReal = this.marginBottom;
		this.marginLeftReal = this.marginLeft;
		this.marginRightReal = this.marginRight
	},
	updateValueAxes : function() {
		var a = this.valueAxes,
			b = this.marginLeftReal,
			c = this.marginTopReal,
			d = this.plotAreaHeight,
			e = this.plotAreaWidth,
			f;
		for (f = 0; f < a.length; f++) {
			var g = a[f];
			g.axisRenderer = AmCharts.RecAxis;
			g.guideFillRenderer = AmCharts.RecFill;
			g.axisItemRenderer = AmCharts.RecItem;
			g.dx = this.dx;
			g.dy = this.dy;
			g.viW = e - 1;
			g.viH = d - 1;
			g.marginsChanged = !0;
			g.viX = b;
			g.viY = c;this.updateObjectSize(g)
		}
	},
	updateObjectSize : function(a) {
		a.width = (this.plotAreaWidth - 1) * this.widthMultiplier;
		a.height = (this.plotAreaHeight - 1) * this.heightMultiplier;
		a.x = this.marginLeftReal + this.horizontalPosition;
		a.y = this.marginTopReal + this.verticalPosition
	},
	updateGraphs : function() {
		var a = this.graphs,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			c.x = this.marginLeftReal + this.horizontalPosition;
			c.y = this.marginTopReal + this.verticalPosition;
			c.width = this.plotAreaWidth * this.widthMultiplier;
			c.height = this.plotAreaHeight * this.heightMultiplier;
			c.index = b;
			c.dx = this.dx;
			c.dy = this.dy;
			c.rotate = this.rotate;
			c.chartType = this.chartType
		}
	},
	updateChartCursor : function() {
		var a = this.chartCursor;
		a && (a.x = this.marginLeftReal, a.y = this.marginTopReal, a.width = this.plotAreaWidth - 1, a.height = this.plotAreaHeight -
			1, a.chart = this)
	},
	updateScrollbars : function() {},
	addChartCursor : function(a) {
		AmCharts.callMethod("destroy", [ this.chartCursor ]);a && (this.listenTo(a, "changed", this.handleCursorChange), this.listenTo(a, "zoomed", this.handleCursorZoom));
		this.chartCursor = a
	},
	removeChartCursor : function() {
		AmCharts.callMethod("destroy", [ this.chartCursor ]);
		this.chartCursor = null
	},
	zoomTrendLines : function() {
		var a = this.trendLines,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			c.valueAxis.recalculateToPercents ? c.set && c.set.hide() : (c.x = this.marginLeftReal +
			this.horizontalPosition, c.y = this.marginTopReal + this.verticalPosition, c.draw())
		}
	},
	addTrendLine : function(a) {
		this.trendLines.push(a)
	},
	removeTrendLine : function(a) {
		var b = this.trendLines,
			c;
		for (c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1)
	},
	adjustMargins : function(a, b) {
		var c = a.scrollbarHeight;
		"top" == a.position ? b ? this.marginLeftReal += c : this.marginTopReal += c : b ? this.marginRightReal += c : this.marginBottomReal += c
	},
	getScrollbarPosition : function(a, b, c) {
		a.position = b ? "bottom" == c || "left" == c ? "bottom" : "top" : "top" == c || "right" == c ? "bottom" : "top"
	},
	updateChartScrollbar : function(a, b) {
		if (a) {
			a.rotate = b;
			var c = this.marginTopReal,
				d = this.marginLeftReal,
				e = a.scrollbarHeight,
				f = this.dx,
				g = this.dy;
			"top" == a.position ? b ? (a.y = c, a.x = d - e) : (a.y = c - e + g, a.x = d + f) : b ? (a.y = c + g, a.x = d + this.plotAreaWidth + f) : (a.y = c + this.plotAreaHeight + 1, a.x = this.marginLeftReal)
		}
	},
	showZB : function(a) {
		var b = this.zbSet;
		b && (a ? b.show() : b.hide(), this.zbBG.hide())
	},
	handleReleaseOutside : function(a) {
		AmCharts.AmRectangularChart.base.handleReleaseOutside.call(this, a);(a = this.chartCursor) && a.handleReleaseOutside()
	},
	handleMouseDown : function(a) {
		AmCharts.AmRectangularChart.base.handleMouseDown.call(this, a);
		var b = this.chartCursor;
		b && b.handleMouseDown(a)
	},
	handleCursorChange : function(a) {}
});
AmCharts.TrendLine = AmCharts.Class({
	construct : function() {
		this.createEvents("click");
		this.isProtected = !1;
		this.dashLength = 0;
		this.lineColor = "#00CC00";
		this.lineThickness = this.lineAlpha = 1
	},
	draw : function() {
		var a = this;
		a.destroy();
		var b = a.chart,
			c = b.container,
			d,
			e,
			f,
			g,
			h = a.categoryAxis,
			k = a.initialDate,
			l = a.initialCategory,
			m = a.finalDate,
			p = a.finalCategory,
			r = a.valueAxis,
			n = a.valueAxisX,
			s = a.initialXValue,
			q = a.finalXValue,
			v = a.initialValue,
			u = a.finalValue,
			t = r.recalculateToPercents;
		h && (k && (d = h.dateToCoordinate(k)), l && (d = h.categoryToCoordinate(l)), m && (e = h.dateToCoordinate(m)), p && (e = h.categoryToCoordinate(p)));n && !t && (isNaN(s) || (d = n.getCoordinate(s)), isNaN(q) || (e = n.getCoordinate(q)));r && !t && (isNaN(v) || (f = r.getCoordinate(v)), isNaN(u) || (g = r.getCoordinate(u)));isNaN(d) || isNaN(e) || isNaN(f) || isNaN(f) || (b.rotate ? (h = [ f, g ], e = [ d, e ]) : (h = [ d, e ], e = [ f, g ]), f = a.lineColor, d = AmCharts.line(c, h, e, f, a.lineAlpha, a.lineThickness, a.dashLength), e = AmCharts.line(c, h, e, f, 0.005, 5), c = c.set([ d, e ]), c.translate(b.marginLeftReal, b.marginTopReal), b.trendLinesSet.push(c), a.line = d, a.set = c, e.mouseup(function() {
			a.handleLineClick()
		}).mouseover(function() {
			a.handleLineOver()
		}).mouseout(function() {
			a.handleLineOut()
		}), e.touchend && e.touchend(function() {
			a.handleLineClick()
		}))
	},
	handleLineClick : function() {
		var a = {
			type : "click",
			trendLine : this,
			chart : this.chart
		};
		this.fire(a.type, a)
	},
	handleLineOver : function() {
		var a = this.rollOverColor;
		void 0 !== a && this.line.attr({
			stroke : a
		})
	},
	handleLineOut : function() {
		this.line.attr({
			stroke : this.lineColor
		})
	},
	destroy : function() {
		AmCharts.remove(this.set)
	}
});
AmCharts.AmSerialChart = AmCharts.Class({
	inherits : AmCharts.AmRectangularChart,
	construct : function() {
		AmCharts.AmSerialChart.base.construct.call(this);this.createEvents("changed");
		this.columnSpacing = 5;
		this.columnSpacing3D = 0;
		this.columnWidth = 0.8;
		this.updateScrollbar = !0;
		var a = new AmCharts.CategoryAxis;
		a.chart = this;
		this.categoryAxis = a;
		this.chartType = "serial";
		this.zoomOutOnDataUpdate = !0;
		this.skipZoom = !1;
		this.minSelectedTime = 0
	},
	initChart : function() {
		AmCharts.AmSerialChart.base.initChart.call(this);this.updateCategoryAxis();this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
		var a = this.chartCursor;
		a && a.updateData();
		var a = this.countColumns(),
			b = this.graphs,
			c;
		for (c = 0; c < b.length; c++) b[c].columnCount = a;
		this.updateScrollbar = !0;this.drawChart();this.autoMargins && !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins())
	},
	validateData : function(a) {
		this.marginsUpdated = !1;this.zoomOutOnDataUpdate && !a && (this.endTime = this.end = this.startTime = this.start = NaN);AmCharts.AmSerialChart.base.validateData.call(this)
	},
	drawChart : function() {
		AmCharts.AmSerialChart.base.drawChart.call(this);
		var a = this.chartData;
		if (AmCharts.ifArray(a)) {
			var b = this.chartScrollbar;
			b && b.draw();
			if (0 < this.realWidth && 0 < this.realHeight) {
				var a = a.length - 1,
					c,
					b = this.categoryAxis;
				if (b.parseDates && !b.equalSpacing) {
					if (b = this.startTime, c = this.endTime, isNaN(b) || isNaN(c)) b = this.firstTime, c = this.lastTime
				} else if (b = this.start, c = this.end, isNaN(b) || isNaN(c)) b = 0, c = a;
				this.endTime = this.startTime = this.end = this.start = void 0;this.zoom(b, c)
			}
		} else this.cleanChart();
		this.dispDUpd();
		this.chartCreated = !0
	},
	cleanChart : function() {
		AmCharts.callMethod("destroy", [ this.valueAxes, this.graphs, this.categoryAxis, this.chartScrollbar, this.chartCursor ])
	},
	updateCategoryAxis : function() {
		var a = this.categoryAxis;
		a.id = "categoryAxis";
		a.rotate = this.rotate;
		a.axisRenderer = AmCharts.RecAxis;
		a.guideFillRenderer = AmCharts.RecFill;
		a.axisItemRenderer = AmCharts.RecItem;a.setOrientation(!this.rotate);
		a.x = this.marginLeftReal;
		a.y = this.marginTopReal;
		a.dx = this.dx;
		a.dy = this.dy;
		a.width = this.plotAreaWidth -
			1;
		a.height = this.plotAreaHeight - 1;
		a.viW = this.plotAreaWidth - 1;
		a.viH = this.plotAreaHeight - 1;
		a.viX = this.marginLeftReal;
		a.viY = this.marginTopReal;
		a.marginsChanged = !0
	},
	updateValueAxes : function() {
		AmCharts.AmSerialChart.base.updateValueAxes.call(this);
		var a = this.valueAxes,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b],
				d = this.rotate;
			c.rotate = d;c.setOrientation(d);
			d = this.categoryAxis;
			if (!d.startOnAxis || d.parseDates)
				c.expandMinMax = !0
		}
	},
	updateData : function() {
		this.parseData();
		var a = this.graphs,
			b,
			c = this.chartData;
		for (b = 0; b < a.length; b++) a[b].data = c;
		0 < c.length && (this.firstTime = this.getStartTime(c[0].time), this.lastTime = this.getEndTime(c[c.length - 1].time))
	},
	getStartTime : function(a) {
		var b = this.categoryAxis;
		return AmCharts.resetDateToMin(new Date(a), b.minPeriod, 1, b.firstDayOfWeek).getTime()
	},
	getEndTime : function(a) {
		var b = AmCharts.extractPeriod(this.categoryAxis.minPeriod);
		return AmCharts.changeDate(new Date(a), b.period, b.count, !0).getTime() - 1
	},
	updateMargins : function() {
		AmCharts.AmSerialChart.base.updateMargins.call(this);
		var a = this.chartScrollbar;
		a && (this.getScrollbarPosition(a, this.rotate, this.categoryAxis.position), this.adjustMargins(a, this.rotate))
	},
	updateScrollbars : function() {
		this.updateChartScrollbar(this.chartScrollbar, this.rotate)
	},
	zoom : function(a, b) {
		var c = this.categoryAxis;
		c.parseDates && !c.equalSpacing ? this.timeZoom(a, b) : this.indexZoom(a, b)
	},
	timeZoom : function(a, b) {
		var c = this.maxSelectedTime;
		isNaN(c) || (b != this.endTime && b - a > c && (a = b - c, this.updateScrollbar = !0), a != this.startTime && b - a > c && (b = a + c, this.updateScrollbar = !0));
		var d = this.minSelectedTime;
		if (0 < d && b - a < d) {
			var e = Math.round(a + (b - a) / 2),
				d = Math.round(d / 2);
			a = e - d;
			b = e + d
		}
		var f = this.chartData,
			e = this.categoryAxis;
		if (AmCharts.ifArray(f) && (a != this.startTime || b != this.endTime)) {
			var g = e.minDuration(),
				d = this.firstTime,
				h = this.lastTime;
			a || (a = d, isNaN(c) || (a = h - c));b || (b = h);a > h && (a = h);b < d && (b = d);a < d && (a = d);b > h && (b = h);b < a && (b = a + g);b - a < g / 5 && (b < h ? b = a + g / 5 : a = b - g / 5);
			this.startTime = a;
			this.endTime = b;
			c = f.length - 1;
			g = this.getClosestIndex(f, "time", a, !0, 0, c);
			f = this.getClosestIndex(f, "time", b, !1, g, c);e.timeZoom(a, b);e.zoom(g, f);
			this.start = AmCharts.fitToBounds(g, 0, c);
			this.end = AmCharts.fitToBounds(f, 0, c);this.zoomAxesAndGraphs();this.zoomScrollbar();
			a != d || b != h ? this.showZB(!0) : this.showZB(!1);this.updateColumnsDepth();this.dispatchTimeZoomEvent()
		}
	},
	indexZoom : function(a, b) {
		var c = this.maxSelectedSeries;
		isNaN(c) || (b != this.end && b - a > c && (a = b - c, this.updateScrollbar = !0), a != this.start && b - a > c && (b = a + c, this.updateScrollbar = !0));
		if (a != this.start || b != this.end) {
			var d = this.chartData.length - 1;
			isNaN(a) && (a = 0, isNaN(c) || (a = d - c));isNaN(b) && (b = d);b < a && (b = a);b > d && (b = d);a > d && (a = d - 1);0 > a && (a = 0);
			this.start = a;
			this.end = b;this.categoryAxis.zoom(a, b);this.zoomAxesAndGraphs();this.zoomScrollbar();
			0 !== a || b != this.chartData.length - 1 ? this.showZB(!0) : this.showZB(!1);this.updateColumnsDepth();this.dispatchIndexZoomEvent()
		}
	},
	updateGraphs : function() {
		AmCharts.AmSerialChart.base.updateGraphs.call(this);
		var a = this.graphs,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			c.columnWidth = this.columnWidth;
			c.categoryAxis = this.categoryAxis
		}
	},
	updateColumnsDepth : function() {
		var a,
			b = this.graphs,
			c;
		AmCharts.remove(this.columnsSet);
		this.columnsArray = [];
		for (a = 0; a < b.length; a++) {
			c = b[a];var d = c.columnsArray;
			if (d) {
				var e;
				for (e = 0; e < d.length; e++) this.columnsArray.push(d[e])
			}
		}
		this.columnsArray.sort(thispareDepth);
		if (0 < this.columnsArray.length) {
			b = this.container.set();this.columnSet.push(b);
			for (a = 0; a < this.columnsArray.length; a++) b.push(this.columnsArray[a].column.set);
			c && b.translate(c.x, c.y);
			this.columnsSet = b
		}
	},
	compareDepth : function(a, b) {
		return a.depth > b.depth ? 1 : -1
	},
	zoomScrollbar : function() {
		var a = this.chartScrollbar,
			b = this.categoryAxis;
		a && this.updateScrollbar && (b.parseDates && !b.equalSpacing ? a.timeZoom(this.startTime, this.endTime) : a.zoom(this.start, this.end), this.updateScrollbar = !0)
	},
	updateTrendLines : function() {
		var a = this.trendLines,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			c.chart = this;c.valueAxis || (c.valueAxis = this.valueAxes[0]);
			c.categoryAxis = this.categoryAxis
		}
	},
	zoomAxesAndGraphs : function() {
		if (!this.scrollbarOnly) {
			var a = this.valueAxes,
				b;
			for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end);
			a = this.graphs;
			for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end);
			this.zoomTrendLines();(b = this.chartCursor) && b.zoom(this.start, this.end, this.startTime, this.endTime)
		}
	},
	countColumns : function() {
		var a = 0,
			b = this.valueAxes.length,
			c = this.graphs.length,
			d,
			e,
			f = !1,
			g,
			h;
		for (h = 0; h < b; h++) {
			e = this.valueAxes[h];var k = e.stackType;
			if ("100%" == k || "regular" == k)
				for (f = !1, g = 0; g < c; g++) d = this.graphs[g], d.hidden || d.valueAxis != e || "column" != d.type || (!f && d.stackable && (a++, f = !0), d.stackable || a++, d.columnIndex = a - 1);
			if ("none" == k || "3d" == k)
				for (g = 0; g < c; g++) d = this.graphs[g], d.hidden || d.valueAxis != e || "column" != d.type || (d.columnIndex = a, a++);
			if ("3d" == k) {
				for (h = 0; h < c; h++) d = this.graphs[h], d.depthCount = a;
				a = 1
			}
		}
		return a
	},
	parseData : function() {
		AmCharts.AmSerialChart.base.parseData.call(this);this.parseSerialData()
	},
	getCategoryIndexByValue : function(a) {
		var b = this.chartData,
			c,
			d;
		for (d = 0; d < b.length; d++) b[d].category == a && (c = d);
		return c
	},
	handleCursorChange : function(a) {
		this.updateLegendValues(a.index)
	},
	handleCursorZoom : function(a) {
		this.updateScrollbar = !0;this.zoom(a.start, a.end)
	},
	handleScrollbarZoom : function(a) {
		this.updateScrollbar = !1;this.zoom(a.start, a.end)
	},
	dispatchTimeZoomEvent : function() {
		if (this.prevStartTime != this.startTime || this.prevEndTime != this.endTime) {
			var a = {
				type : "zoomed"
			};
			a.startDate = new Date(this.startTime);
			a.endDate = new Date(this.endTime);
			a.startIndex = this.start;
			a.endIndex = this.end;
			this.startIndex = this.start;
			this.endIndex = this.end;
			this.startDate = a.startDate;
			this.endDate = a.endDate;
			this.prevStartTime = this.startTime;
			this.prevEndTime = this.endTime;
			var b = this.categoryAxis,
				c = AmCharts.extractPeriod(b.minPeriod).period,
				b = b.dateFormatsObject[c];
			a.startValue = AmCharts.formatDate(a.startDate, b);
			a.endValue = AmCharts.formatDate(a.endDate, b);
			a.chart = this;
			a.target = this;this.fire(a.type, a)
		}
	},
	dispatchIndexZoomEvent : function() {
		if (this.prevStartIndex != this.start || this.prevEndIndex != this.end) {
			this.startIndex = this.start;
			this.endIndex = this.end;
			var a = this.chartData;
			if (AmCharts.ifArray(a) && !isNaN(this.start) && !isNaN(this.end)) {
				var b = {
					chart : this,
					target : this,
					type : "zoomed"
				};
				b.startIndex = this.start;
				b.endIndex = this.end;
				b.startValue = a[this.start].category;
				b.endValue = a[this.end].category;this.categoryAxis.parseDates && (this.startTime = a[this.start].time, this.endTime = a[this.end].time, b.startDate = new Date(this.startTime), b.endDate = new Date(this.endTime));
				this.prevStartIndex = this.start;
				this.prevEndIndex = this.end;this.fire(b.type, b)
			}
		}
	},
	updateLegendValues : function(a) {
		var b = this.graphs,
			c;
		for (c = 0; c < b.length; c++) {
			var d = b[c];
			isNaN(a) ? d.currentDataItem = void 0 : d.currentDataItem = this.chartData[a].axes[d.valueAxis.id].graphs[d.id]
		}
		this.legend && this.legend.updateValues()
	},
	getClosestIndex : function(a, b, c, d, e, f) {
		0 > e && (e = 0);f > a.length - 1 && (f = a.length - 1);
		var g = e + Math.round((f - e) / 2),
			h = a[g][b];
		if (1 >= f - e) {
			if (d) return e;
			d = a[f][b];return Math.abs(a[e][b] - c) < Math.abs(d - c) ? e : f
		}
		return c == h ? g : c < h ? this.getClosestIndex(a, b, c, d, e, g) : this.getClosestIndex(a, b, c, d, g, f)
	},
	zoomToIndexes : function(a, b) {
		this.updateScrollbar = !0;
		var c = this.chartData;
		if (c) {
			var d = c.length;
			0 < d && (0 > a && (a = 0), b > d - 1 && (b = d - 1), d = this.categoryAxis, d.parseDates && !d.equalSpacing ? this.zoom(c[a].time, this.getEndTime(c[b].time)) : this.zoom(a, b))
		}
	},
	zoomToDates : function(a, b) {
		this.updateScrollbar = !0;
		var c = this.chartData;
		if (this.categoryAxis.equalSpacing) {
			var d = this.getClosestIndex(c, "time", a.getTime(), !0, 0, c.length),
				c = this.getClosestIndex(c, "time", b.getTime(), !1, 0, c.length);
			this.zoom(d, c)
		} else this.zoom(a.getTime(), b.getTime())
	},
	zoomToCategoryValues : function(a, b) {
		this.updateScrollbar = !0;this.zoom(this.getCategoryIndexByValue(a), this.getCategoryIndexByValue(b))
	},
	formatString : function(a, b) {
		var c = b.graph;
		if (-1 != a.indexOf("[[category]]")) {
			var d = b.serialDataItem.category;
			if (this.categoryAxis.parseDates) {
				var e = this.balloonDateFormat,
					f = this.chartCursor;
				f && (e = f.categoryBalloonDateFormat);-1 != a.indexOf("[[category]]") && (e = AmCharts.formatDate(d, e), -1 != e.indexOf("fff") && (e = AmCharts.formatMilliseconds(e, d)), d = e)
			}
			a = a.replace(/\[\[category\]\]/g, String(d))
		}
		c = c.numberFormatter;c || (c = this.numberFormatter);
		d = b.graph.valueAxis;(e = d.duration) && !isNaN(b.values.value) && (d = AmCharts.formatDuration(b.values.value, e, "", d.durationUnits, d.maxInterval, c), a = a.replace(RegExp("\\[\\[value\\]\\]", "g"), d));
		d = "value open low high close total".split(" ");
		e = this.percentFormatter;
		a = AmCharts.formatValue(a, b.percents, d, e, "percents\\.");
		a = AmCharts.formatValue(a, b.values, d, c, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
		a = AmCharts.formatValue(a, b.values, [ "percents" ], e);-1 != a.indexOf("[[") && (a = AmCharts.formatDataContextValue(a, b.dataContext));return a = AmCharts.AmSerialChart.base.formatString.call(this, a, b)
	},
	addChartScrollbar : function(a) {
		AmCharts.callMethod("destroy", [ this.chartScrollbar ]);a && (a.chart = this, this.listenTo(a, "zoomed", this.handleScrollbarZoom));
		this.rotate ? void 0 === a.width && (a.width = a.scrollbarHeight) : void 0 === a.height && (a.height = a.scrollbarHeight);
		this.chartScrollbar = a
	},
	removeChartScrollbar : function() {
		AmCharts.callMethod("destroy", [ this.chartScrollbar ]);
		this.chartScrollbar = null
	},
	handleReleaseOutside : function(a) {
		AmCharts.AmSerialChart.base.handleReleaseOutside.call(this, a);AmCharts.callMethod("handleReleaseOutside", [ this.chartScrollbar ])
	}
});
AmCharts.AmRadarChart = AmCharts.Class({
	inherits : AmCharts.AmCoordinateChart,
	construct : function() {
		AmCharts.AmRadarChart.base.construct.call(this);
		this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 0;
		this.chartType = "radar";
		this.radius = "35%"
	},
	initChart : function() {
		AmCharts.AmRadarChart.base.initChart.call(this);this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);this.drawChart()
	},
	updateData : function() {
		this.parseData();
		var a = this.graphs,
			b;
		for (b = 0; b < a.length; b++) a[b].data = this.chartData
	},
	updateGraphs : function() {
		var a = this.graphs,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			c.index = b;
			c.width = this.realRadius;
			c.height = this.realRadius;
			c.x = this.marginLeftReal;
			c.y = this.marginTopReal;
			c.chartType = this.chartType
		}
	},
	parseData : function() {
		AmCharts.AmRadarChart.base.parseData.call(this);this.parseSerialData()
	},
	updateValueAxes : function() {
		var a = this.valueAxes,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			c.axisRenderer = AmCharts.RadAxis;
			c.guideFillRenderer = AmCharts.RadarFill;
			c.axisItemRenderer = AmCharts.RadItem;
			c.autoGridCount = !1;
			c.x = this.marginLeftReal;
			c.y = this.marginTopReal;
			c.width = this.realRadius;
			c.height = this.realRadius
		}
	},
	drawChart : function() {
		AmCharts.AmRadarChart.base.drawChart.call(this);
		var a = this.updateWidth(),
			b = this.updateHeight(),
			c = this.marginTop + this.getTitleHeight(),
			d = this.marginLeft,
			b = b - c - this.marginBottom;
		this.marginLeftReal = d + (a - d - this.marginRight) / 2;
		this.marginTopReal = c + b / 2;
		this.realRadius = AmCharts.toCoordinate(this.radius, a, b);this.updateValueAxes();this.updateGraphs();
		a = this.chartData;
		if (AmCharts.ifArray(a)) {
			if (0 < this.realWidth && 0 < this.realHeight) {
				a = a.length - 1;
				d = this.valueAxes;
				for (c = 0; c < d.length; c++) d[c].zoom(0, a);
				d = this.graphs;
				for (c = 0; c < d.length; c++) d[c].zoom(0, a);
				(a = this.legend) && a.invalidateSize()
			}
		} else this.cleanChart();
		this.dispDUpd();
		this.chartCreated = !0
	},
	formatString : function(a, b) {
		var c = b.graph;
		-1 != a.indexOf("[[category]]") && (a = a.replace(/\[\[category\]\]/g, String(b.serialDataItem.category)));
		c = c.numberFormatter;c || (c = this.numberFormatter);
		a = AmCharts.formatValue(a, b.values, [ "value" ], c, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);-1 != a.indexOf("[[") && (a = AmCharts.formatDataContextValue(a, b.dataContext));return a = AmCharts.AmRadarChart.base.formatString.call(this, a, b)
	},
	cleanChart : function() {
		AmCharts.callMethod("destroy", [ this.valueAxes, this.graphs ])
	}
});
AmCharts.AxisBase = AmCharts.Class({
	construct : function() {
		this.viY = this.viX = this.y = this.x = this.dy = this.dx = 0;
		this.axisThickness = 1;
		this.axisColor = "#000000";
		this.axisAlpha = 1;
		this.gridCount = this.tickLength = 5;
		this.gridAlpha = 0.15;
		this.gridThickness = 1;
		this.gridColor = "#000000";
		this.dashLength = 0;
		this.labelFrequency = 1;
		this.showLastLabel = this.showFirstLabel = !0;
		this.fillColor = "#FFFFFF";
		this.fillAlpha = 0;
		this.labelsEnabled = !0;
		this.labelRotation = 0;
		this.autoGridCount = !0;
		this.valueRollOverColor = "#CC0000";
		this.offset = 0;
		this.guides = [];
		this.visible = !0;
		this.counter = 0;
		this.guides = [];
		this.ignoreAxisWidth = this.inside = !1;
		this.minGap = 75;
		this.titleBold = !0
	},
	zoom : function(a, b) {
		this.start = a;
		this.end = b;
		this.dataChanged = !0;this.draw()
	},
	fixAxisPosition : function() {
		var a = this.position;
		"H" == this.orientation ? ("left" == a && (a = "bottom"), "right" == a && (a = "top")) : ("bottom" == a && (a = "left"), "top" == a && (a = "right"));
		this.position = a
	},
	draw : function() {
		var a = this.chart;
		void 0 === this.titleColor && (this.titleColor = a.color);isNaN(this.titleFontSize) && (this.titleFontSize = a.fontSize + 1);
		this.allLabels = [];
		this.counter = 0;this.destroy();this.fixAxisPosition();
		this.labels = [];
		var b = a.container,
			c = b.set();
		a.gridSet.push(c);
		this.set = c;
		b = b.set();a.axesLabelsSet.push(b);
		this.labelsSet = b;
		this.axisLine = new this.axisRenderer(this);this.autoGridCount && ("V" == this.orientation ? (a = this.height / 35, 3 > a && (a = 3)) : a = this.width / this.minGap, this.gridCount = Math.max(a, 1));
		this.axisWidth = this.axisLine.axisWidth;this.addTitle()
	},
	setOrientation : function(a) {
		this.orientation = a ? "H" : "V"
	},
	addTitle : function() {
		var a = this.title;
		if (a) {
			var b = this.chart;
			this.titleLabel = AmCharts.text(b.container, a, this.titleColor, b.fontFamily, this.titleFontSize, "middle", this.titleBold)
		}
	},
	positionTitle : function() {
		var a = this.titleLabel;
		if (a) {
			var b,
				c,
				d = this.labelsSet,
				e = {};
			0 < d.length() ? e = d.getBBox() : (e.x = 0, e.y = 0, e.width = this.viW, e.height = this.viH);d.push(a);
			var d = e.x,
				f = e.y;
			AmCharts.VML && (this.rotate ? d -= this.x : f -= this.y);
			var g = e.width,
				e = e.height,
				h = this.viW,
				k = this.viH;
			a.getBBox();
			var l = 0,
				m = this.titleFontSize / 2,
				p = this.inside;
			switch (this.position) {
			case "top":
				b = h / 2;c = f - 10 - m;
				break;case "bottom":
				b = h / 2;c = f + e + 10 + m;
				break;case "left":
				b = d - 10 - m;p && (b -= 5);c = k / 2;l = -90;
				break;case "right":
				b = d + g + 10 + m - 3, p && (b += 7), c = k / 2, l = -90
			}
			this.marginsChanged ? (a.translate(b, c), this.tx = b, this.ty = c) : a.translate(this.tx, this.ty);
			this.marginsChanged = !1;0 !== l && a.rotate(l)
		}
	},
	pushAxisItem : function(a, b) {
		var c = a.graphics();
		0 < c.length() && (b ? this.labelsSet.push(c) : this.set.push(c));(c = a.getLabel()) && this.labelsSet.push(c)
	},
	addGuide : function(a) {
		this.guides.push(a)
	},
	removeGuide : function(a) {
		var b = this.guides,
			c;
		for (c = 0; c < b.length; c++) b[c] == a && b.splice(c, 1)
	},
	handleGuideOver : function(a) {
		clearTimeout(this.chart.hoverInt);
		var b = a.graphics.getBBox(),
			c = b.x + b.width / 2,
			b = b.y + b.height / 2,
			d = a.fillColor;
		void 0 === d && (d = a.lineColor);this.chart.showBalloon(a.balloonText, d, !0, c, b)
	},
	handleGuideOut : function(a) {
		this.chart.hideBalloon()
	},
	addEventListeners : function(a, b) {
		var c = this;
		a.mouseover(function() {
			c.handleGuideOver(b)
		});a.mouseout(function() {
			c.handleGuideOut(b)
		})
	},
	getBBox : function() {
		var a = this.labelsSet.getBBox();
		AmCharts.VML || (a = {
			x : a.x + this.x,
			y : a.y + this.y,
			width : a.width,
			height : a.height
		});return a
	},
	destroy : function() {
		AmCharts.remove(this.set);AmCharts.remove(this.labelsSet);
		var a = this.axisLine;
		a && AmCharts.remove(a.set);AmCharts.remove(this.grid0)
	}
});
AmCharts.ValueAxis = AmCharts.Class({
	inherits : AmCharts.AxisBase,
	construct : function() {
		this.createEvents("axisChanged", "logarithmicAxisFailed", "axisSelfZoomed", "axisZoomed");AmCharts.ValueAxis.base.construct.call(this);
		this.dataChanged = !0;
		this.gridCount = 8;
		this.stackType = "none";
		this.position = "left";
		this.unitPosition = "right";
		this.recalculateToPercents = this.includeHidden = this.includeGuidesInMinMax = this.integersOnly = !1;
		this.durationUnits = {
			DD : "d. ",
			hh : ":",
			mm : ":",
			ss : ""
		};
		this.scrollbar = !1;
		this.baseValue = 0;
		this.radarCategoriesEnabled = !0;
		this.gridType = "polygons";
		this.useScientificNotation = !1;
		this.axisTitleOffset = 10;
		this.minMaxMultiplier = 1
	},
	updateData : function() {
		0 >= this.gridCount && (this.gridCount = 1);
		this.totals = [];
		this.data = this.chart.chartData;"xy" != this.chart.chartType && (this.stackGraphs("smoothedLine"), this.stackGraphs("line"), this.stackGraphs("column"), this.stackGraphs("step"));this.recalculateToPercents && this.recalculate();
		this.synchronizationMultiplier && this.synchronizeWith ? this.foundGraphs = !0 : (this.foundGraphs = !1, this.getMinMax())
	},
	draw : function() {
		AmCharts.ValueAxis.base.draw.call(this);
		var a = this.chart,
			b = this.set;
		"duration" == this.type && (this.duration = "ss");!0 === this.dataChanged && (this.updateData(), this.dataChanged = !1);
		if (this.logarithmic && (0 >= this.getMin(0, this.data.length - 1) || 0 >= this.minimum)) this.fire("logarithmicAxisFailed", {
				type : "logarithmicAxisFailed",
				chart : a
			});else {
			this.grid0 = null;
			var c,
				d,
				e = a.dx,
				f = a.dy,
				g = !1,
				h = this.logarithmic,
				k = a.chartType;
			if (isNaN(this.min) || isNaN(this.max) || !this.foundGraphs || Infinity == this.min || -Infinity == this.max)
				g = !0;else {
				var l = this.labelFrequency,
					m = this.showFirstLabel,
					p = this.showLastLabel,
					r = 1,
					n = 0,
					s = Math.round((this.max - this.min) / this.step) + 1,
					q;
				!0 === h ? (q = Math.log(this.max) * Math.LOG10E - Math.log(this.minReal) * Math.LOG10E, this.stepWidth = this.axisWidth / q, 2 < q && (s = Math.ceil(Math.log(this.max) * Math.LOG10E) + 1, n = Math.round(Math.log(this.minReal) * Math.LOG10E), s > this.gridCount && (r = Math.ceil(s / this.gridCount)))) : this.stepWidth = this.axisWidth / (this.max - this.min);
				c = 0;1 > this.step && -1 < this.step && (c = this.getDecimals(this.step));this.integersOnly && (c = 0);c > this.maxDecCount && (c = this.maxDecCount);
				var v = this.precision;
				isNaN(v) || (c = v);
				this.max = AmCharts.roundTo(this.max, this.maxDecCount);
				this.min = AmCharts.roundTo(this.min, this.maxDecCount);
				var u = {};
				u.precision = c;
				u.decimalSeparator = a.numberFormatter.decimalSeparator;
				u.thousandsSeparator = a.numberFormatter.thousandsSeparator;
				this.numberFormatter = u;
				var t,
					w = this.guides,
					y = w.length;
				if (0 < y) {
					var x = this.fillAlpha;
					for (d = this.fillAlpha = 0; d < y; d++) {
						var A = w[d],
							z = NaN,
							H = A.above;
						isNaN(A.toValue) || (z = this.getCoordinate(A.toValue), t = new this.axisItemRenderer(this, z, "", !0, NaN, NaN, A), this.pushAxisItem(t, H));var E = NaN;
						isNaN(A.value) || (E = this.getCoordinate(A.value), t = new this.axisItemRenderer(this, E, A.label, !0, NaN, (z - E) / 2, A), this.pushAxisItem(t, H));isNaN(z - E) || (t = new this.guideFillRenderer(this, E, z, A), this.pushAxisItem(t, H), t = t.graphics(), A.graphics = t, A.balloonText && this.addEventListeners(t, A))
					}
					this.fillAlpha = x
				}
				w = !1;
				for (d = n; d < s; d += r) t = AmCharts.roundTo(this.step * d + this.min, c), -1 != String(t).indexOf("e") && (w = !0, String(t).split("e"));
				this.duration && (this.maxInterval = AmCharts.getMaxInterval(this.max, this.duration));
				for (d = n; d < s; d += r)
					if (n = this.step * d + this.min, n = AmCharts.roundTo(n, this.maxDecCount + 1), !this.integersOnly || Math.round(n) == n)
						if (isNaN(v) || Number(AmCharts.toFixed(n, v)) == n) {
							!0 === h && (0 === n && (n = this.minReal), 2 < q && (n = Math.pow(10, d)), w = -1 != String(n).indexOf("e") ? !0 : !1);this.useScientificNotation && (w = !0);this.usePrefixes && (w = !1);
							w ? (t = -1 == String(n).indexOf("e") ? n.toExponential(15) : String(n), t = t.split("e"), c = Number(t[0]), t = Number(t[1]), c = AmCharts.roundTo(c, 14), 10 == c && (c = 1, t += 1), t = c + "e" + t, 0 === n && (t = "0"), 1 == n && (t = "1")) : (h && (c = String(n).split("."), u.precision = c[1] ? c[1].length : -1), t = this.usePrefixes ? AmCharts.addPrefix(n, a.prefixesOfBigNumbers, a.prefixesOfSmallNumbers, u, !0) : AmCharts.formatNumber(n, u, u.precision));this.duration && (t = AmCharts.formatDuration(n, this.duration, "", this.durationUnits, this.maxInterval, u));
							this.recalculateToPercents ? t += "%" : (c = this.unit) && (t = "left" == this.unitPosition ? c + t : t + c);Math.round(d / l) != d / l && (t = void 0);
							if (0 === d && !m || d == s - 1 && !p)
								t = " ";
							c = this.getCoordinate(n);this.labelFunction && (t = this.labelFunction(n, t, this));
							t = new this.axisItemRenderer(this, c, t);this.pushAxisItem(t);
							if (n == this.baseValue && "radar" != k) {
								var I,
									K,
									y = this.viW,
									x = this.viH,
									n = this.viX;
								t = this.viY;
								"H" == this.orientation ? 0 <= c && c <= y + 1 && (I = [ c, c, c + e ], K = [ x, 0, f ]) : 0 <= c && c <= x + 1 && (I = [ 0, y, y + e ], K = [ c, c, c + f ]);I && (c = AmCharts.fitToBounds(2 * this.gridAlpha, 0, 1), c = AmCharts.line(a.container, I, K, this.gridColor, c, 1, this.dashLength), c.translate(n, t), this.grid0 = c, a.axesSet.push(c), c.toBack())
							}
				}
				d = this.baseValue;this.min > this.baseValue && this.max > this.baseValue && (d = this.min);this.min < this.baseValue && this.max < this.baseValue && (d = this.max);h && d < this.minReal && (d = this.minReal);
				this.baseCoord = this.getCoordinate(d);
				a = {
					type : "axisChanged",
					target : this,
					chart : a
				};
				a.min = h ? this.minReal : this.min;
				a.max = this.max;this.fire("axisChanged", a);
				this.axisCreated = !0
			}
			h = this.axisLine.set;
			a = this.labelsSet;this.positionTitle();
			"radar" != k ? (k = this.viX, d = this.viY, b.translate(k, d), a.translate(k, d)) : h.toFront();
			!this.visible || g ? (b.hide(), h.hide(), a.hide()) : (b.show(), h.show(), a.show())
		}
	},
	getDecimals : function(a) {
		var b = 0;
		isNaN(a) || (a = String(a), -1 != a.indexOf("e-") ? b = Number(a.split("-")[1]) : -1 != a.indexOf(".") && (b = a.split(".")[1].length));return b
	},
	stackGraphs : function(a) {
		var b = this.stackType;
		"stacked" == b && (b = "regular");"line" == b && (b = "none");"100% stacked" == b && (b = "100%");
		this.stackType = b;
		var c = [],
			d = [],
			e = [],
			f = [],
			g,
			h = this.chart.graphs,
			k,
			l,
			m,
			p,
			r = this.baseValue,
			n = !1;
		if ("line" == a || "step" == a || "smoothedLine" == a)
			n = !0;
		if (n && ("regular" == b || "100%" == b))
			for (p = 0; p < h.length; p++) m = h[p], m.hidden || (l = m.type, m.chart == this.chart && m.valueAxis == this && a == l && m.stackable && (k && (m.stackGraph = k), k = m));
		for (k = this.start; k <= this.end; k++) {
			var s = 0;
			for (p = 0; p < h.length; p++)
				if (m = h[p], !m.hidden && (l = m.type, m.chart == this.chart && m.valueAxis == this && a == l && m.stackable && (l = this.data[k].axes[this.id].graphs[m.id], g = l.values.value, !isNaN(g)))) {
					var q = this.getDecimals(g);
					s < q && (s = q);
					isNaN(f[k]) ? f[k] = Math.abs(g) : f[k] += Math.abs(g);
					f[k] = AmCharts.roundTo(f[k], s);
					m = m.fillToGraph;n && m && (m = this.data[k].axes[this.id].graphs[m.id]) && (l.values.open = m.values.value);"regular" == b && (n && (isNaN(c[k]) ? (c[k] = g, l.values.close = g, l.values.open = this.baseValue) : (isNaN(g) ? l.values.close = c[k] : l.values.close = g + c[k], l.values.open = c[k], c[k] = l.values.close)), "column" != a || isNaN(g) || (l.values.close = g, 0 > g ? (l.values.close = g, isNaN(d[k]) ? l.values.open = r : (l.values.close += d[k], l.values.open = d[k]), d[k] = l.values.close) : (l.values.close = g, isNaN(e[k]) ? l.values.open = r : (l.values.close += e[k], l.values.open = e[k]), e[k] = l.values.close)))
			}
		}
		for (k = this.start; k <= this.end; k++)
			for (p = 0; p < h.length; p++) m = h[p], m.hidden || (l = m.type, m.chart == this.chart && m.valueAxis == this && a == l && m.stackable && (l = this.data[k].axes[this.id].graphs[m.id], g = l.values.value, isNaN(g) || (c = 100 * (g / f[k]), l.values.percents = c, l.values.total = f[k], "100%" == b && (isNaN(d[k]) && (d[k] = 0), isNaN(e[k]) && (e[k] = 0), 0 > c ? (l.values.close = AmCharts.fitToBounds(c + d[k], -100, 100), l.values.open = d[k], d[k] = l.values.close) : (l.values.close = AmCharts.fitToBounds(c + e[k], -100, 100), l.values.open = e[k], e[k] = l.values.close)))))
	},
	recalculate : function() {
		var a = this.chart.graphs,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			if (c.valueAxis == this) {
				var d = "value";
				if ("candlestick" == c.type || "ohlc" == c.type)
					d = "open";
				var e,
					f,
					g = this.end + 2,
					g = AmCharts.fitToBounds(this.end + 1, 0, this.data.length - 1),
					h = this.start;
				0 < h && h--;
				var k;
				f = this.start;cpareFromStart && (f = 0);
				for (k = f; k <= g && (f = this.data[k].axes[this.id].graphs[c.id], e = f.values[d], isNaN(e)); k++)
					;
				for (d = h; d <= g; d++) {
					f = this.data[d].axes[this.id].graphs[c.id];
					f.percents = {};var h = f.values,
						l;
					for (l in h) f.percents[l] = "percents" != l ? 100 * (h[l] / e) - 100 : h[l]
				}
			}
		}
	},
	getMinMax : function() {
		var a = !1,
			b = this.chart,
			c = b.graphs,
			d;
		for (d = 0; d < c.length; d++) {
			var e = c[d].type;
			("line" == e || "step" == e || "smoothedLine" == e) && this.expandMinMax && (a = !0)
		}
		a && (0 < this.start && this.start--, this.end < this.data.length - 1 && this.end++);"serial" == b.chartType && (!0 !== b.categoryAxis.parseDates || a || this.end < this.data.length - 1 && this.end++);
		a = this.minMaxMultiplier;
		this.min = this.getMin(this.start, this.end);
		this.max = this.getMax();
		a = (this.max - this.min) * (a - 1);
		this.min -= a;
		this.max += a;
		a = this.guides.length;
		if (this.includeGuidesInMinMax && 0 < a)
			for (b = 0; b < a; b++) c = this.guides[b], c.toValue < this.min && (this.min = c.toValue), c.value < this.min && (this.min = c.value), c.toValue > this.max && (this.max = c.toValue), c.value > this.max && (this.max = c.value);
		isNaN(this.minimum) || (this.min = this.minimum);isNaN(this.maximum) || (this.max = this.maximum);this.min > this.max && (a = this.max, this.max = this.min, this.min = a);isNaN(this.minTemp) || (this.min = this.minTemp);isNaN(this.maxTemp) || (this.max = this.maxTemp);
		this.minReal = this.min;
		this.maxReal = this.max;0 === this.min && 0 === this.max && (this.max = 9);this.min > this.max && (this.min = this.max - 1);
		a = this.min;
		b = this.max;
		c = this.max - this.min;
		d = 0 === c ? Math.pow(10, Math.floor(Math.log(Math.abs(this.max)) * Math.LOG10E)) / 10 : Math.pow(10, Math.floor(Math.log(Math.abs(c)) * Math.LOG10E)) / 10;isNaN(this.maximum) && isNaN(this.maxTemp) && (this.max = Math.ceil(this.max / d) * d + d);isNaN(this.minimum) && isNaN(this.minTemp) && (this.min = Math.floor(this.min / d) * d - d);0 > this.min && 0 <= a && (this.min = 0);0 < this.max && 0 >= b && (this.max = 0);"100%" == this.stackType && (this.min = 0 > this.min ? -100 : 0, this.max = 0 > this.max ? 0 : 100);
		c = this.max - this.min;
		d = Math.pow(10, Math.floor(Math.log(Math.abs(c)) * Math.LOG10E)) / 10;
		this.step = Math.ceil(c / this.gridCount / d) * d;
		c = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E));
		c = c.toExponential(0).split("e");
		d = Number(c[1]);9 == Number(c[0]) && d++;
		c = this.generateNumber(1, d);
		d = Math.ceil(this.step / c);5 < d && (d = 10);5 >= d && 2 < d && (d = 5);
		this.step = Math.ceil(this.step / (c * d)) * c * d;
		1 > c ? (this.maxDecCount = Math.abs(Math.log(Math.abs(c)) * Math.LOG10E), this.maxDecCount = Math.round(this.maxDecCount), this.step = AmCharts.roundTo(this.step, this.maxDecCount + 1)) : this.maxDecCount = 0;
		this.min = this.step * Math.floor(this.min / this.step);
		this.max = this.step * Math.ceil(this.max / this.step);0 > this.min && 0 <= a && (this.min = 0);0 < this.max && 0 >= b && (this.max = 0);1 < this.minReal && 1 < this.max - this.minReal && (this.minReal = Math.floor(this.minReal));
		c = Math.pow(10, Math.floor(Math.log(Math.abs(this.minReal)) * Math.LOG10E));0 === this.min && (this.minReal = c);0 === this.min && 1 < this.minReal && (this.minReal = 1);0 < this.min && 0 < this.minReal - this.step && (this.minReal = this.min + this.step < this.minReal ? this.min + this.step : this.min);
		c = Math.log(b) * Math.LOG10E - Math.log(a) * Math.LOG10E;this.logarithmic && (2 < c ? (this.minReal = this.min = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)), this.max = Math.pow(10, Math.ceil(Math.log(Math.abs(b)) * Math.LOG10E))) : (b = Math.pow(10, Math.floor(Math.log(Math.abs(this.min)) * Math.LOG10E)) / 10, a = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)) / 10, b < a && (this.minReal = this.min = 10 * a)))
	},
	generateNumber : function(a, b) {
		var c = "",
			d;
		d = 0 > b ? Math.abs(b) - 1 : Math.abs(b);
		var e;
		for (e = 0; e < d; e++) c += "0";
		return 0 > b ? Number("0." + c + String(a)) : Number(String(a) + c)
	},
	getMin : function(a, b) {
		var c,
			d;
		for (d = a; d <= b; d++) {
			var e = this.data[d].axes[this.id].graphs,
				f;
			for (f in e)
				if (e.hasOwnProperty(f)) {
					var g = this.chart.getGraphById(f);
					if (g.includeInMinMax && (!g.hidden || this.includeHidden)) {
						isNaN(c) && (c = Infinity);
						this.foundGraphs = !0;
						g = e[f].values;this.recalculateToPercents && (g = e[f].percents);
						var h;
						if (this.minMaxField) h = g[this.minMaxField], h < c && (c = h);else
							for (var k in g) g.hasOwnProperty(k) && "percents" != k && "total" != k && (h = g[k], h < c && (c = h))
					}
			}
		}
		return c
	},
	getMax : function() {
		var a,
			b;
		for (b = this.start; b <= this.end; b++) {
			var c = this.data[b].axes[this.id].graphs,
				d;
			for (d in c)
				if (c.hasOwnProperty(d)) {
					var e = this.chart.getGraphById(d);
					if (e.includeInMinMax && (!e.hidden || this.includeHidden)) {
						isNaN(a) && (a = -Infinity);
						this.foundGraphs = !0;
						e = c[d].values;this.recalculateToPercents && (e = c[d].percents);
						var f;
						if (this.minMaxField) f = e[this.minMaxField], f > a && (a = f);else
							for (var g in e) e.hasOwnProperty(g) && "percents" != g && "total" != g && (f = e[g], f > a && (a = f))
					}
			}
		}
		return a
	},
	dispatchZoomEvent : function(a, b) {
		var c = {
			type : "axisZoomed",
			startValue : a,
			endValue : b,
			target : this,
			chart : this.chart
		};
		this.fire(c.type, c)
	},
	zoomToValues : function(a, b) {
		if (b < a) {
			var c = b;
			b = a;
			a = c
		}
		a < this.min && (a = this.min);b > this.max && (b = this.max);
		c = {
			type : "axisSelfZoomed"
		};
		c.chart = this.chart;
		c.valueAxis = this;
		c.multiplier = this.axisWidth / Math.abs(this.getCoordinate(b) - this.getCoordinate(a));
		c.position = "V" == this.orientation ? this.reversed ? this.getCoordinate(a) : this.getCoordinate(b) : this.reversed ? this.getCoordinate(b) : this.getCoordinate(a);this.fire(c.type, c)
	},
	coordinateToValue : function(a) {
		if (isNaN(a)) return NaN;
		var b = this.axisWidth,
			c = this.stepWidth,
			d = this.reversed,
			e = this.rotate,
			f = this.min,
			g = this.minReal;
		return !0 === this.logarithmic ? Math.pow(10, (e ? !0 === d ? (b - a) / c : a / c : !0 === d ? a / c : (b - a) / c) + Math.log(g) * Math.LOG10E) : !0 === d ? e ? f - (a - b) / c : a / c + f : e ? a / c + f : f - (a - b) / c
	},
	getCoordinate : function(a) {
		if (isNaN(a)) return NaN;
		var b = this.rotate,
			c = this.reversed,
			d = this.axisWidth,
			e = this.stepWidth,
			f = this.min,
			g = this.minReal;
		!0 === this.logarithmic ? (a = Math.log(a) * Math.LOG10E - Math.log(g) * Math.LOG10E, b = b ? !0 === c ? d - e * a : e * a : !0 === c ? e * a : d - e * a) : b = !0 === c ? b ? d - e * (a - f) : e * (a - f) : b ? e * (a - f) : d - e * (a - f);
		b = this.rotate ? b + (this.x - this.viX) : b + (this.y - this.viY);return Math.round(b)
	},
	synchronizeWithAxis : function(a) {
		this.synchronizeWith = a;this.removeListener(this.synchronizeWith, "axisChanged", this.handleSynchronization);this.listenTo(this.synchronizeWith, "axisChanged", this.handleSynchronization)
	},
	handleSynchronization : function(a) {
		var b = this.synchronizeWith;
		a = b.min;
		var c = b.max,
			b = b.step,
			d = this.synchronizationMultiplier;
		d && (this.min = a * d, this.max = c * d, this.step = b * d, a = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E)), a = Math.abs(Math.log(Math.abs(a)) * Math.LOG10E), this.maxDecCount = a = Math.round(a), this.draw())
	}
});
AmCharts.CategoryAxis = AmCharts.Class({
	inherits : AmCharts.AxisBase,
	construct : function() {
		AmCharts.CategoryAxis.base.construct.call(this);
		this.minPeriod = "DD";
		this.equalSpacing = this.parseDates = !1;
		this.position = "bottom";
		this.startOnAxis = !1;
		this.firstDayOfWeek = 1;
		this.gridPosition = "middle";
		this.markPeriodChange = this.boldPeriodBeginning = !0;
		this.safeDistance = 30;
		this.centerLabelOnFullPeriod = !0;
		this.periods = [ {
			period : "ss",
			count : 1
		}, {
			period : "ss",
			count : 5
		}, {
			period : "ss",
			count : 10
		}, {
			period : "ss",
			count : 30
		}, {
			period : "mm",
			count : 1
		}, {
			period : "mm",
			count : 5
		}, {
			period : "mm",
			count : 10
		}, {
			period : "mm",
			count : 30
		}, {
			period : "hh",
			count : 1
		}, {
			period : "hh",
			count : 3
		}, {
			period : "hh",
			count : 6
		}, {
			period : "hh",
			count : 12
		}, {
			period : "DD",
			count : 1
		}, {
			period : "DD",
			count : 2
		}, {
			period : "DD",
			count : 3
		}, {
			period : "DD",
			count : 4
		}, {
			period : "DD",
			count : 5
		}, {
			period : "WW",
			count : 1
		}, {
			period : "MM",
			count : 1
		}, {
			period : "MM",
			count : 2
		}, {
			period : "MM",
			count : 3
		}, {
			period : "MM",
			count : 6
		}, {
			period : "YYYY",
			count : 1
		}, {
			period : "YYYY",
			count : 2
		}, {
			period : "YYYY",
			count : 5
		}, {
			period : "YYYY",
			count : 10
		}, {
			period : "YYYY",
			count : 50
		}, {
			period : "YYYY",
			count : 100
		} ];
		this.dateFormats = [ {
			period : "fff",
			format : "JJ:NN:SS"
		}, {
			period : "ss",
			format : "JJ:NN:SS"
		}, {
			period : "mm",
			format : "JJ:NN"
		}, {
			period : "hh",
			format : "JJ:NN"
		}, {
			period : "DD",
			format : "MMM DD"
		}, {
			period : "WW",
			format : "MMM DD"
		}, {
			period : "MM",
			format : "MMM"
		}, {
			period : "YYYY",
			format : "YYYY"
		} ];
		this.nextPeriod = {};
		this.nextPeriod.fff = "ss";
		this.nextPeriod.ss = "mm";
		this.nextPeriod.mm = "hh";
		this.nextPeriod.hh = "DD";
		this.nextPeriod.DD = "MM";
		this.nextPeriod.MM = "YYYY"
	},
	draw : function() {
		AmCharts.CategoryAxis.base.draw.call(this);this.generateDFObject();
		var a = this.chart.chartData;
		this.data = a;
		if (AmCharts.ifArray(a)) {
			var b,
				c = this.chart,
				d = this.start,
				e = this.labelFrequency,
				f = 0;
			b = this.end - d + 1;
			var g = this.gridCount,
				h = this.showFirstLabel,
				k = this.showLastLabel,
				l,
				m = "",
				m = AmCharts.extractPeriod(this.minPeriod);
			l = AmCharts.getPeriodDuration(m.period, m.count);
			var p,
				r,
				n,
				s,
				q;
			p = this.rotate;
			var v = this.firstDayOfWeek,
				u = this.boldPeriodBeginning,
				a = AmCharts.resetDateToMin(new Date(a[a.length - 1].time + 1.05 * l), this.minPeriod, 1, v).getTime(),
				t;
			this.endTime > a && (this.endTime = a);
			if (this.parseDates && !this.equalSpacing) {
				this.timeDifference = this.endTime - this.startTime;
				d = this.choosePeriod(0);
				e = d.period;
				p = d.count;
				r = AmCharts.getPeriodDuration(e, p);r < l && (e = m.period, p = m.count, r = l);
				n = e;"WW" == n && (n = "DD");
				this.stepWidth = this.getStepWidth(this.timeDifference);
				var g = Math.ceil(this.timeDifference / r) + 5,
					w = m = AmCharts.resetDateToMin(new Date(this.startTime - r), e, p, v).getTime();
				n == e && 1 == p && this.centerLabelOnFullPeriod && (s = r * this.stepWidth);
				this.cellWidth = l * this.stepWidth;
				b = Math.round(m / r);
				d = -1;b / 2 == Math.round(b / 2) && (d = -2, m -= r);
				var y = c.firstTime;
				if (0 < this.gridCount)
					for (b = d; b <= g; b++) {
						a = y + r * (b + 0.1 + Math.floor((w - y) / r));
						a = AmCharts.resetDateToMin(new Date(a), e, p, v).getTime();
						l = (a - this.startTime) * this.stepWidth;
						q = !1;this.nextPeriod[n] && (q = this.checkPeriodChange(this.nextPeriod[n], 1, a, m));
						t = !1;
						q && this.markPeriodChange ? (m = this.dateFormatsObject[this.nextPeriod[n]], t = !0) : m = this.dateFormatsObject[n];u || (t = !1);
						m = AmCharts.formatDate(new Date(a), m);
						if (b == d && !h || b == g && !k)
							m = " ";
						this.labelFunction && (m = this.labelFunction(m, new Date(a), this));
						m = new this.axisItemRenderer(this, l, m, !1, s, 0, !1, t);this.pushAxisItem(m);
						m = a
				}
			} else if (!this.parseDates) {
				if (this.cellWidth = this.getStepWidth(b), b < g && (g = b), f += this.start, this.stepWidth = this.getStepWidth(b), 0 < g)
					for (u = Math.floor(b / g), l = f, l / 2 == Math.round(l / 2) && l--, 0 > l && (l = 0), g = 0, b = l; b <= this.end + 2; b++)
						if (0 <= b && b < this.data.length ? (n = this.data[b], m = n.category) : m = "", b / u == Math.round(b / u) || n.forceShow) {
							l = this.getCoordinate(b - f);
							v = 0;"start" == this.gridPosition && (l -= this.cellWidth / 2, v = this.cellWidth / 2);
							if (b == d && !h || b == this.end && !k)
								m = void 0;
							Math.round(g / e) != g / e && (m = void 0);g++;
							s = this.cellWidth;p && (s = NaN);this.labelFunction && (m = this.labelFunction(m, n, this));
							m = AmCharts.fixNewLines(m);
							m = new this.axisItemRenderer(this, l, m, !0, s, v, void 0, !1, v);this.pushAxisItem(m)
				}
			} else if (this.parseDates && this.equalSpacing) {
				f = this.start;
				this.startTime = this.data[this.start].time;
				this.endTime = this.data[this.end].time;
				this.timeDifference = this.endTime - this.startTime;
				d = this.choosePeriod(0);
				e = d.period;
				p = d.count;
				r = AmCharts.getPeriodDuration(e, p);r < l && (e = m.period, p = m.count, r = l);
				n = e;"WW" == n && (n = "DD");
				this.stepWidth = this.getStepWidth(b);
				g = Math.ceil(this.timeDifference / r) + 5;
				m = AmCharts.resetDateToMin(new Date(this.startTime - r), e, p, v).getTime();
				this.cellWidth = this.getStepWidth(b);
				b = Math.round(m / r);
				d = -1;b / 2 == Math.round(b / 2) && (d = -2, m -= r);
				l = this.start;l / 2 == Math.round(l / 2) && l--;0 > l && (l = 0);
				s = this.end + 2;s >= this.data.length && (s = this.data.length);
				r = !1;
				r = !h;
				this.previousPos = -1E3;20 < this.labelRotation && (this.safeDistance = 5);
				if (this.data[l].time != AmCharts.resetDateToMin(new Date(this.data[l].time), e, p, v).getTime())
					for (v = 0, w = m, b = l; b < s; b++) a = this.data[b].time, this.checkPeriodChange(e, p, a, w) && (v++, 2 <= v && (l = b, b = s), w = a);
				for (b = l; b < s; b++)
					if (a = this.data[b].time, this.checkPeriodChange(e, p, a, m)) {
						l = this.getCoordinate(b - this.start);
						q = !1;this.nextPeriod[n] && (q = this.checkPeriodChange(this.nextPeriod[n], 1, a, m));
						t = !1;
						q && this.markPeriodChange ? (m = this.dateFormatsObject[this.nextPeriod[n]], t = !0) : m = this.dateFormatsObject[n];
						m = AmCharts.formatDate(new Date(a), m);
						if (b == d && !h || b == g && !k)
							m = " ";
						r ? r = !1 : (u || (t = !1), l - this.previousPos > this.safeDistance * Math.cos(this.labelRotation * Math.PI / 180) && (this.labelFunction && (m = this.labelFunction(m, new Date(a), this)), m = new this.axisItemRenderer(this, l, m, void 0, void 0, void 0, void 0, t), v = m.graphics(), this.pushAxisItem(m), v = v.getBBox().width, AmCharts.isModern || (v -= l), this.previousPos = l + v));
						m = a
				}
			}
			for (b = 0; b < this.data.length; b++)
				if (h = this.data[b]) k = this.parseDates && !this.equalSpacing ? Math.round((h.time -
						this.startTime) * this.stepWidth + this.cellWidth / 2) : this.getCoordinate(b - f), h.x[this.id] = k;
			h = this.guides.length;
			for (b = 0; b < h; b++) k = this.guides[b], v = v = v = g = u = NaN, d = k.above, k.toCategory && (v = c.getCategoryIndexByValue(k.toCategory), isNaN(v) || (u = this.getCoordinate(v - f), m = new this.axisItemRenderer(this, u, "", !0, NaN, NaN, k), this.pushAxisItem(m, d))), k.category && (v = c.getCategoryIndexByValue(k.category), isNaN(v) || (g = this.getCoordinate(v - f), v = (u - g) / 2, m = new this.axisItemRenderer(this, g, k.label, !0, NaN, v, k), this.pushAxisItem(m, d))), k.toDate && (this.equalSpacing ? (v = c.getClosestIndex(this.data, "time", k.toDate.getTime(), !1, 0, this.data.length - 1), isNaN(v) || (u = this.getCoordinate(v - f))) : u = (k.toDate.getTime() - this.startTime) * this.stepWidth, m = new this.axisItemRenderer(this, u, "", !0, NaN, NaN, k), this.pushAxisItem(m, d)), k.date && (this.equalSpacing ? (v = c.getClosestIndex(this.data, "time", k.date.getTime(), !1, 0, this.data.length - 1), isNaN(v) || (g = this.getCoordinate(v - f))) : g = (k.date.getTime() - this.startTime) * this.stepWidth, v = (u - g) / 2, m = "H" == this.orientation ? new this.axisItemRenderer(this, g, k.label, !1, 2 * v, NaN, k) : new this.axisItemRenderer(this, g, k.label, !1, NaN, v, k), this.pushAxisItem(m, d)), u = new this.guideFillRenderer(this, g, u, k), g = u.graphics(), this.pushAxisItem(u, d), k.graphics = g, g.index = b, k.balloonText && this.addEventListeners(g, k)
		}
		this.axisCreated = !0;
		c = this.x;
		f = this.y;this.set.translate(c, f);this.labelsSet.translate(c, f);this.positionTitle();(c = this.axisLine.set) && c.toFront()
	},
	choosePeriod : function(a) {
		var b = AmCharts.getPeriodDuration(this.periods[a].period, this.periods[a].count),
			c = Math.ceil(this.timeDifference / b),
			d = this.periods;
		return this.timeDifference < b && 0 < a ? d[a - 1] : c <= this.gridCount ? d[a] : a + 1 < d.length ? this.choosePeriod(a + 1) : d[a]
	},
	getStepWidth : function(a) {
		var b;
		this.startOnAxis ? (b = this.axisWidth / (a - 1), 1 == a && (b = this.axisWidth)) : b = this.axisWidth / a;return b
	},
	getCoordinate : function(a) {
		a *= this.stepWidth;this.startOnAxis || (a += this.stepWidth / 2);return Math.round(a)
	},
	timeZoom : function(a, b) {
		this.startTime = a;
		this.endTime = b
	},
	minDuration : function() {
		var a = AmCharts.extractPeriod(this.minPeriod);
		return AmCharts.getPeriodDuration(a.period, a.count)
	},
	checkPeriodChange : function(a, b, c, d) {
		c = new Date(c);
		var e = new Date(d),
			f = this.firstDayOfWeek;
		d = b;"DD" == a && (b = 1);
		c = AmCharts.resetDateToMin(c, a, b, f).getTime();
		b = AmCharts.resetDateToMin(e, a, b, f).getTime();return "DD" == a && c - b <= AmCharts.getPeriodDuration(a, d) ? !1 : c != b ? !0 : !1
	},
	generateDFObject : function() {
		this.dateFormatsObject = {};
		var a;
		for (a = 0; a < this.dateFormats.length; a++) {
			var b = this.dateFormats[a];
			this.dateFormatsObject[b.period] = b.format
		}
	},
	xToIndex : function(a) {
		var b = this.data,
			c = this.chart,
			d = c.rotate,
			e = this.stepWidth;
		this.parseDates && !this.equalSpacing ? (a = this.startTime + Math.round(a / e) - this.minDuration() / 2, c = c.getClosestIndex(b, "time", a, !1, this.start, this.end + 1)) : (this.startOnAxis || (a -= e / 2), c = this.start + Math.round(a / e));
		var c = AmCharts.fitToBounds(c, 0, b.length - 1),
			f;
		b[c] && (f = b[c].x[this.id]);
		d ? f > this.height + 1 && c-- : f > this.width + 1 && c--;0 > f && c++;return c = AmCharts.fitToBounds(c, 0, b.length - 1)
	},
	dateToCoordinate : function(a) {
		return this.parseDates && !this.equalSpacing ? (a.getTime() -
		this.startTime) * this.stepWidth : this.parseDates && this.equalSpacing ? (a = this.chart.getClosestIndex(this.data, "time", a.getTime(), !1, 0, this.data.length - 1), this.getCoordinate(a - this.start)) : NaN
	},
	categoryToCoordinate : function(a) {
		return this.chart ? (a = this.chart.getCategoryIndexByValue(a), this.getCoordinate(a - this.start)) : NaN
	},
	coordinateToDate : function(a) {
		return this.equalSpacing ? (a = this.xToIndex(a), new Date(this.data[a].time)) : new Date(this.startTime + a / this.stepWidth)
	}
});
AmCharts.RecAxis = AmCharts.Class({
	construct : function(a) {
		var b = a.chart,
			c = a.axisThickness,
			d = a.axisColor,
			e = a.axisAlpha,
			f = a.offset,
			g = a.dx,
			h = a.dy,
			k = a.viX,
			l = a.viY,
			m = a.viH,
			p = a.viW,
			r = b.container;
		"H" == a.orientation ? (d = AmCharts.line(r, [ 0, p ], [ 0, 0 ], d, e, c), this.axisWidth = a.width, "bottom" == a.position ? (a = c / 2 + f + m + l - 1, c = k) : (a = -c / 2 - f + l + h, c = g + k)) : (this.axisWidth = a.height, "right" == a.position ? (d = AmCharts.line(r, [ 0, 0, -g ], [ 0, m, m - h ], d, e, c), a = l + h, c = c / 2 + f + g + p + k - 1) : (d = AmCharts.line(r, [ 0, 0 ], [ 0, m ], d, e, c), a = l, c = -c / 2 - f + k));d.translate(c, a);b.axesSet.push(d);
		this.set = d
	}
});
AmCharts.RecItem = AmCharts.Class({
	construct : function(a, b, c, d, e, f, g, h, k) {
		b = Math.round(b);void 0 == c && (c = "");k || (k = 0);void 0 == d && (d = !0);
		var l = a.chart.fontFamily,
			m = a.fontSize;
		void 0 == m && (m = a.chart.fontSize);
		var p = a.color;
		void 0 == p && (p = a.chart.color);
		var r = a.chart.container,
			n = r.set();
		this.set = n;
		var s = a.axisThickness,
			q = a.axisColor,
			v = a.axisAlpha,
			u = a.tickLength,
			t = a.gridAlpha,
			w = a.gridThickness,
			y = a.gridColor,
			x = a.dashLength,
			A = a.fillColor,
			z = a.fillAlpha,
			H = a.labelsEnabled,
			E = a.labelRotation,
			I = a.counter,
			K = a.inside,
			S = a.dx,
			Q = a.dy,
			Fa = a.orientation,
			da = a.position,
			ha = a.previousCoord,
			T = a.viH,
			R = a.viW,
			W = a.offset,
			ma,
			X;
		g ? (H = !0, isNaN(g.tickLength) || (u = g.tickLength), void 0 != g.lineColor && (y = g.lineColor), void 0 != g.color && (p = g.color), isNaN(g.lineAlpha) || (t = g.lineAlpha), isNaN(g.dashLength) || (x = g.dashLength), isNaN(g.lineThickness) || (w = g.lineThickness), !0 === g.inside && (K = !0), isNaN(g.labelRotation) || (E = g.labelRotation), isNaN(g.fontSize) || (m = g.fontSize), g.position && (da = g.position)) : "" === c && (u = 0);
		X = "start";e && (X = "middle");
		var Y = E * Math.PI / 180,
			ka,
			G = 0,
			B = 0,
			$ = 0,
			ga = ka = 0;
		"V" == Fa && (E = 0);
		var U;
		H && (U = AmCharts.text(r, c, p, l, m, X, h), ga = U.getBBox().width);
		if ("H" == Fa) {
			if (0 <= b && b <= R + 1 && (0 < u && 0 < v && b + k <= R + 1 && (ma = AmCharts.line(r, [ b + k, b + k ], [ 0, u ], q, v, w), n.push(ma)), 0 < t && (X = AmCharts.line(r, [ b, b + S, b + S ], [ T, T + Q, Q ], y, t, w, x), n.push(X))), B = 0, G = b, g && 90 == E && (G -= m), !1 === d ? (X = "start", B = "bottom" == da ? K ? B + u : B - u : K ? B - u : B + u, G += 3, e && (G += e / 2, X = "middle"), 0 < E && (X = "middle")) : X = "middle", 1 == I && 0 < z && !g && ha < R && (d = AmCharts.fitToBounds(b, 0, R), ha = AmCharts.fitToBounds(ha, 0, R), ka = d - ha, 0 < ka && (fill = AmCharts.rect(r, ka, a.height, A, z), fill.translate(d - ka + S, Q), n.push(fill))), "bottom" == da ? (B += T + m / 2 + W, K ? 0 < E ? (B = T - ga / 2 * Math.sin(Y) - u - 3, G += ga / 2 * Math.cos(Y)) : B -= u + m + 3 + 3 : 0 < E ? (B = T + ga / 2 * Math.sin(Y) + u + 3, G -= ga / 2 * Math.cos(Y)) : B += u + s + 3 + 3) : (B += Q + m / 2 - W, G += S, K ? 0 < E ? (B = ga / 2 * Math.sin(Y) + u + 3, G -= ga / 2 * Math.cos(Y)) : B += u + 3 : 0 < E ? (B = -(ga / 2) * Math.sin(Y) - u - 6, G += ga / 2 * Math.cos(Y)) : B -= u + m + 3 + s + 3), "bottom" == da ? ka = (K ? T - u - 1 : T + s - 1) + W : ($ = S, ka = (K ? Q : Q - u - s + 1) - W), f && (G += f), Q = G, 0 < E && (Q += ga / 2 * Math.cos(Y)), U && (da = 0, K && (da = ga / 2 * Math.cos(Y)), Q + da > R + 2 || 0 > Q)) U.remove(), U = null
		} else {
			0 <= b && b <= T + 1 && (0 < u && 0 < v && b + k <= T + 1 && (ma = AmCharts.line(r, [ 0, u ], [ b + k, b + k ], q, v, w), n.push(ma)), 0 < t && (X = AmCharts.line(r, [ 0, S, R + S ], [ b, b + Q, b + Q ], y, t, w, x), n.push(X)));
			X = "end";
			if (!0 === K && "left" == da || !1 === K && "right" == da)
				X = "start";
			B = b - m / 2;1 == I && 0 < z && !g && (d = AmCharts.fitToBounds(b, 0, T), ha = AmCharts.fitToBounds(ha, 0, T), Y = d - ha, fill = AmCharts.polygon(r, [ 0, a.width, a.width, 0 ], [ 0, 0, Y, Y ], A, z), fill.translate(S, d - Y + Q), n.push(fill));
			B += m / 2;
			"right" == da ? (G += S + R + W, B += Q, K ? (G -= u + 4, f || (B -= m / 2 + 3)) : (G += u + 4 + s, B -= 2)) : K ? (G += u + 4 - W, f || (B -= m / 2 + 3), g && (G += S, B += Q)) : (G += -u - s - 4 - 2 - W, B -= 2);ma && ("right" == da ? ($ += S + W + R, ka += Q, $ = K ? $ - s : $ + s) : ($ -= W, K || ($ -= u + s)));f && (B += f);
			K = -3;"right" == da && (K += Q);U && (B > T + 1 || B < K) && (U.remove(), U = null)
		}
		ma && ma.translate($, ka);!1 === a.visible && (ma && ma.remove(), U && (U.remove(), U = null));U && (U.attr({
			"text-anchor" : X
		}), U.translate(G, B), 0 !== E && U.rotate(-E), a.allLabels.push(U), " " != c && (this.label = U));
		a.counter = 0 === I ? 1 : 0;
		a.previousCoord = b;0 === this.set.node.childNodes.length && this.set.remove()
	},
	graphics : function() {
		return this.set
	},
	getLabel : function() {
		return this.label
	}
});
AmCharts.RecFill = AmCharts.Class({
	construct : function(a, b, c, d) {
		var e = a.dx,
			f = a.dy,
			g = a.orientation,
			h = 0;
		if (c < b) {
			var k = b;
			b = c;
			c = k
		}
		var l = d.fillAlpha;
		isNaN(l) && (l = 0);
		k = a.chart.container;
		d = d.fillColor;
		"V" == g ? (b = AmCharts.fitToBounds(b, 0, a.viH), c = AmCharts.fitToBounds(c, 0, a.viH)) : (b = AmCharts.fitToBounds(b, 0, a.viW), c = AmCharts.fitToBounds(c, 0, a.viW));
		c -= b;isNaN(c) && (c = 4, h = 2, l = 0);0 > c && "object" == typeof d && (d = d.join(",").split(",").reverse());
		"V" == g ? (a = AmCharts.rect(k, a.width, c, d, l), a.translate(e, b - h + f)) : (a = AmCharts.rect(k, c, a.height, d, l), a.translate(b - h + e, f));
		this.set = k.set([ a ])
	},
	graphics : function() {
		return this.set
	},
	getLabel : function() {}
});
AmCharts.RadAxis = AmCharts.Class({
	construct : function(a) {
		var b = a.chart,
			c = a.axisThickness,
			d = a.axisColor,
			e = a.axisAlpha,
			f = a.x,
			g = a.y;
		this.set = b.container.set();b.axesSet.push(this.set);
		var h = a.axisTitleOffset,
			k = a.radarCategoriesEnabled,
			l = a.chart.fontFamily,
			m = a.fontSize;
		void 0 === m && (m = a.chart.fontSize);
		var p = a.color;
		void 0 === p && (p = a.chart.color);
		if (b) {
			this.axisWidth = a.height;
			a = b.chartData;
			var r = a.length,
				n;
			for (n = 0; n < r; n++) {
				var s = 180 - 360 / r * n,
					q = f + this.axisWidth * Math.sin(s / 180 * Math.PI),
					v = g + this.axisWidth * Math.cos(s / 180 * Math.PI);
				0 < e && (q = AmCharts.line(b.container, [ f, q ], [ g, v ], d, e, c), this.set.push(q));
				if (k) {
					var u = "start",
						q = f + (this.axisWidth + h) * Math.sin(s / 180 * Math.PI),
						v = g + (this.axisWidth + h) * Math.cos(s / 180 * Math.PI);
					if (180 == s || 0 === s) u = "middle", q -= 5;
					0 > s && (u = "end", q -= 10);180 == s && (v -= 5);0 === s && (v += 5);
					s = AmCharts.text(b.container, a[n].category, p, l, m, u);s.translate(q + 5, v);this.set.push(s);s.getBBox()
				}
			}
		}
	}
});
AmCharts.RadItem = AmCharts.Class({
	construct : function(a, b, c, d, e, f, g) {
		void 0 === c && (c = "");
		var h = a.chart.fontFamily,
			k = a.fontSize;
		void 0 === k && (k = a.chart.fontSize);
		var l = a.color;
		void 0 === l && (l = a.chart.color);
		var m = a.chart.container;
		this.set = d = m.set();
		var p = a.axisColor,
			r = a.axisAlpha,
			n = a.tickLength,
			s = a.gridAlpha,
			q = a.gridThickness,
			v = a.gridColor,
			u = a.dashLength,
			t = a.fillColor,
			w = a.fillAlpha,
			y = a.labelsEnabled;
		e = a.counter;
		var x = a.inside,
			A = a.gridType,
			z;
		b -= a.height;
		var H;
		f = a.x;
		var E = a.y;
		g ? (y = !0, isNaN(g.tickLength) || (n = g.tickLength), void 0 != g.lineColor && (v = g.lineColor), isNaN(g.lineAlpha) || (s = g.lineAlpha), isNaN(g.dashLength) || (u = g.dashLength), isNaN(g.lineThickness) || (q = g.lineThickness), !0 === g.inside && (x = !0)) : c || (s /= 3, n /= 2);
		var I = "end",
			K = -1;
		x && (I = "start", K = 1);
		var S;
		y && (S = AmCharts.text(m, c, l, h, k, I), S.translate(f + (n + 3) * K, b), d.push(S), this.label = S, H = AmCharts.line(m, [ f, f + n * K ], [ b, b ], p, r, q), d.push(H));
		b = a.y - b;
		c = [];
		h = [];
		if (0 < s) {
			if ("polygons" == A) {
				z = a.data.length;
				for (k = 0; k < z; k++) l = 180 - 360 / z * k, c.push(b * Math.sin(l / 180 * Math.PI)), h.push(b * Math.cos(l / 180 * Math.PI));
				c.push(c[0]);h.push(h[0]);
				s = AmCharts.line(m, c, h, v, s, q, u)
			} else
				s = AmCharts.circle(m, b, "#FFFFFF", 0, q, v, s);
			s.translate(f, E);d.push(s)
		}
		if (1 == e && 0 < w && !g) {
			g = a.previousCoord;
			if ("polygons" == A) {
				for (k = z; 0 <= k; k--) l = 180 - 360 / z * k, c.push(g * Math.sin(l / 180 * Math.PI)), h.push(g * Math.cos(l / 180 * Math.PI));
				z = AmCharts.polygon(m, c, h, t, w)
			} else
				z = AmCharts.wedge(m, 0, 0, 0, -360, b, b, g, 0, {
					fill : t,
					"fill-opacity" : w,
					stroke : 0,
					"stroke-opacity" : 0,
					"stroke-width" : 0
				});
			d.push(z);z.translate(f, E)
		}
		!1 === a.visible && (H && H.hide(), S && S.hide());
		a.counter = 0 === e ? 1 : 0;
		a.previousCoord = b
	},
	graphics : function() {
		return this.set
	},
	getLabel : function() {
		return this.label
	}
});
AmCharts.RadarFill = AmCharts.Class({
	construct : function(a, b, c, d) {
		b -= a.axisWidth;
		c -= a.axisWidth;
		var e = Math.max(b, c);
		b = c = Math.min(b, c);
		c = a.chart.container;
		var f = d.fillAlpha,
			g = d.fillColor,
			e = Math.abs(e - a.y);
		b = Math.abs(b - a.y);
		var h = Math.max(e, b);
		b = Math.min(e, b);
		e = h;
		h = -d.angle;
		d = -d.toAngle;isNaN(h) && (h = 0);isNaN(d) && (d = -360);
		this.set = c.set();void 0 === g && (g = "#000000");isNaN(f) && (f = 0);
		if ("polygons" == a.gridType) {
			d = [];
			var k = [],
				l = a.data.length,
				m;
			for (m = 0; m < l; m++) h = 180 - 360 / l * m, d.push(e * Math.sin(h / 180 * Math.PI)), k.push(e * Math.cos(h / 180 * Math.PI));
			d.push(d[0]);k.push(k[0]);
			for (m = l; 0 <= m; m--) h = 180 - 360 / l * m, d.push(b * Math.sin(h / 180 * Math.PI)), k.push(b * Math.cos(h / 180 * Math.PI));
			this.fill = AmCharts.polygon(c, d, k, g, f)
		} else
			this.fill = AmCharts.wedge(c, 0, 0, h, d - h, e, e, b, 0, {
				fill : g,
				"fill-opacity" : f,
				stroke : 0,
				"stroke-opacity" : 0,
				"stroke-width" : 0
			});
		this.set.push(this.fill);this.fill.translate(a.x, a.y)
	},
	graphics : function() {
		return this.set
	},
	getLabel : function() {}
});
AmCharts.AmGraph = AmCharts.Class({
	construct : function() {
		this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem", "clickGraph");
		this.type = "line";
		this.stackable = !0;
		this.columnCount = 1;
		this.columnIndex = 0;
		this.centerCustomBullets = this.showBalloon = !0;
		this.maxBulletSize = 50;
		this.minBulletSize = 0;
		this.balloonText = "[[value]]";
		this.hidden = this.scrollbar = this.animationPlayed = !1;
		this.columnWidth = 0.8;
		this.pointPosition = "middle";
		this.depthCount = 1;
		this.includeInMinMax = !0;
		this.negativeBase = 0;
		this.visibleInLegend = !0;
		this.showAllValueLabels = !1;
		this.showBalloonAt = "close";
		this.lineThickness = 1;
		this.dashLength = 0;
		this.connect = !0;
		this.lineAlpha = 1;
		this.bullet = "none";
		this.bulletBorderThickness = 2;
		this.bulletAlpha = this.bulletBorderAlpha = 1;
		this.bulletSize = 8;
		this.hideBulletsCount = this.bulletOffset = 0;
		this.labelPosition = "top";
		this.cornerRadiusTop = 0;
		this.cursorBulletAlpha = 1;
		this.gradientOrientation = "vertical";
		this.dy = this.dx = 0;
		this.periodValue = "";
		this.y = this.x = 0
	},
	draw : function() {
		var a = this.chart,
			b = a.container;
		this.container = b;this.destroy();
		var c = b.set(),
			d = b.set();
		this.behindColumns ? (a.graphsBehindSet.push(c), a.bulletBehindSet.push(d)) : (a.graphsSet.push(c), a.bulletSet.push(d));
		this.bulletSet = d;
		if (!this.scrollbar) {
			var e = a.marginLeftReal,
				a = a.marginTopReal;
			c.translate(e, a);d.translate(e, a)
		}
		b = b.set();AmCharts.remove(this.columnsSet);c.push(b);
		this.set = c;
		this.columnsSet = b;
		this.columnsArray = [];
		this.ownColumns = [];
		this.allBullets = [];
		this.animationArray = [];AmCharts.ifArray(this.data) && (c = !1, "xy" == this.chartType ? this.xAxis.axisCreated && this.yAxis.axisCreated && (c = !0) : this.valueAxis.axisCreated && (c = !0), !this.hidden && c && this.createGraph())
	},
	createGraph : function() {
		var a = this,
			b = a.chart;
		"inside" == a.labelPosition && (a.labelPosition = "bottom");
		a.startAlpha = b.startAlpha;
		a.seqAn = b.sequencedAnimation;
		a.baseCoord = a.valueAxis.baseCoord;a.fillColors || (a.fillColors = a.lineColor);void 0 === a.fillAlphas && (a.fillAlphas = 0);void 0 === a.bulletColor && (a.bulletColor = a.lineColor, a.bulletColorNegative = a.negativeLineColor);void 0 === a.bulletAlpha && (a.bulletAlpha = a.lineAlpha);a.bulletBorderColor || (a.bulletBorderAlpha = 0);clearTimeout(a.playedTO);
		if (!isNaN(a.valueAxis.min) && !isNaN(a.valueAxis.max)) {
			switch (a.chartType) {
			case "serial":
				a.createSerialGraph();"candlestick" == a.type && 1 > a.valueAxis.minMaxMultiplier && a.positiveClip(a.set);
				break;case "radar":
				a.createRadarGraph();
				break;case "xy":
				a.createXYGraph(), a.positiveClip(a.set)
			}
			a.playedTO = setTimeout(function() {
				a.setAnimationPlayed.call(a)
			}, 500 * a.chart.startDuration)
		}
	},
	setAnimationPlayed : function() {
		this.animationPlayed = !0
	},
	createXYGraph : function() {
		var a = [],
			b = [],
			c = this.xAxis,
			d = this.yAxis;
		this.pmh = d.viH + 1;
		this.pmw = c.viW + 1;
		this.pmy = this.pmx = 0;
		var e;
		for (e = this.start; e <= this.end; e++) {
			var f = this.data[e].axes[c.id].graphs[this.id],
				g = f.values,
				h = g.x,
				k = g.y,
				g = c.getCoordinate(h),
				l = d.getCoordinate(k);
			!isNaN(h) && !isNaN(k) && (a.push(g), b.push(l), (h = this.createBullet(f, g, l, e)) || (h = 0), k = this.labelText) && (f = this.createLabel(f, g, l, k), this.allBullets.push(f), this.positionLabel(g, l, f, this.labelPosition, h))
		}
		this.drawLineGraph(a, b);this.launchAnimation()
	},
	createRadarGraph : function() {
		var a = this.valueAxis.stackType,
			b = [],
			c = [],
			d,
			e,
			f;
		for (f = this.start; f <= this.end; f++) {
			var g = this.data[f].axes[this.valueAxis.id].graphs[this.id],
				h;
			h = "none" == a || "3d" == a ? g.values.value : g.values.close;
			if (isNaN(h)) this.drawLineGraph(b, c), b = [], c = [];else {
				var k = this.y - (this.valueAxis.getCoordinate(h) - this.height),
					l = 180 - 360 / (this.end - this.start + 1) * f;
				h = k * Math.sin(l / 180 * Math.PI);
				k *= Math.cos(l / 180 * Math.PI);b.push(h);c.push(k);(l = this.createBullet(g, h, k, f)) || (l = 0);
				var m = this.labelText;
				m && (g = this.createLabel(g, h, k, m), this.allBullets.push(g), this.positionLabel(h, k, g, this.labelPosition, l));isNaN(d) && (d = h);isNaN(e) && (e = k)
			}
		}
		b.push(d);c.push(e);this.drawLineGraph(b, c);this.launchAnimation()
	},
	positionLabel : function(a, b, c, d, e) {
		var f = c.getBBox();
		switch (d) {
		case "left":
			a -= (f.width + e) / 2 + 2;
			break;case "top":
			b -= (e + f.height) / 2 + 1;
			break;case "right":
			a += (f.width + e) / 2 + 2;
			break;case "bottom":
			b += (e + f.height) / 2 + 1
		}
		c.translate(a, b)
	},
	createSerialGraph : function() {
		var a = this.chart,
			b = this.id,
			c = this.index,
			d = this.data,
			e = this.chart.container,
			f = this.valueAxis,
			g = this.type,
			h = this.columnWidth,
			k = this.width,
			l = this.height,
			m = this.y,
			p = this.rotate,
			r = this.columnCount,
			n = AmCharts.toCoordinate(this.cornerRadiusTop, h / 2),
			s = this.connect,
			q = [],
			v = [],
			u,
			t,
			w,
			y,
			x = this.chart.graphs.length,
			A,
			z = this.dx / this.depthCount,
			H = this.dy / this.depthCount,
			E = f.stackType,
			I = this.labelPosition,
			K = this.start,
			S = this.end,
			Q = this.scrollbar,
			Fa = this.categoryAxis,
			da = this.baseCoord,
			ha = this.negativeBase,
			T = this.columnIndex,
			R = this.lineThickness,
			W = this.lineAlpha,
			ma = this.lineColor,
			X = this.dashLength,
			Y = this.set;
		"above" == I && (I = "top");"below" == I && (I = "bottom");
		var ka = I,
			G = 270;
		"horizontal" == this.gradientOrientation && (G = 0);
		this.gradientRotation = G;
		var B = this.chart.columnSpacing,
			$ = Fa.cellWidth,
			ga = ($ * h - r) / r;
		B > ga && (B = ga);
		var U,
			F,
			Qa,
			Ya = l + 1,
			Za = k + 1,
			Ra = 0,
			$a = 0,
			ab,
			bb,
			Sa,
			Ta,
			Eb = this.fillColors,
			Ga = this.negativeFillColors,
			ya = this.negativeLineColor,
			Ha = this.fillAlphas,
			Ia = this.negativeFillAlphas;
		"object" == typeof Ha && (Ha = Ha[0]);"object" == typeof Ia && (Ia = Ia[0]);
		var Ua = f.getCoordinate(f.min);
		f.logarithmic && (Ua = f.getCoordinate(f.minReal));
		this.minCoord = Ua;this.resetBullet && (this.bullet = "none");
		if (!Q && ("line" == g || "smoothedLine" == g || "step" == g) && (1 == d.length && "step" != g && "none" == this.bullet && (this.bullet = "round", this.resetBullet = !0), Ga || void 0 != ya)) {
			var Ca = ha;
			Ca > f.max && (Ca = f.max);Ca < f.min && (Ca = f.min);f.logarithmic && (Ca = f.minReal);
			var ua = f.getCoordinate(Ca),
				qb = f.getCoordinate(f.max);
			p ? (Ya = l, Za = Math.abs(qb - ua), ab = l, bb = Math.abs(Ua - ua), Ta = $a = 0, f.reversed ? (Ra = 0, Sa = ua) : (Ra = ua, Sa = 0)) : (Za = k, Ya = Math.abs(qb -
				ua), bb = k, ab = Math.abs(Ua - ua), Sa = Ra = 0, f.reversed ? (Ta = m, $a = ua) : Ta = ua + 1)
		}
		var va = Math.round;
		this.pmx = va(Ra);
		this.pmy = va($a);
		this.pmh = va(Ya);
		this.pmw = va(Za);
		this.nmx = va(Sa);
		this.nmy = va(Ta);
		this.nmh = va(ab);
		this.nmw = va(bb);9 > AmCharts.IEversion && 0 < AmCharts.IEversion && (this.nmy = this.nmx = 0, this.nmh = this.height);
		h = "column" == g ? ($ * h - B * (r - 1)) / r : $ * h;1 > h && (h = 1);
		var O;
		if ("line" == g || "step" == g || "smoothedLine" == g) {
			if (0 < K)
				for (O = K - 1; -1 < O; O--)
					if (U = d[O], F = U.axes[f.id].graphs[b], Qa = F.values.value, !isNaN(Qa)) {
						K = O;break
			}
			if (S < d.length - 1)
				for (O = S + 1; O < d.length; O++)
					if (U = d[O], F = U.axes[f.id].graphs[b], Qa = F.values.value, !isNaN(Qa)) {
						S = O;break
			}
		}
		S < d.length - 1 && S++;
		var ea = [],
			fa = [],
			Ja = !1;
		if ("line" == g || "step" == g || "smoothedLine" == g)
			if (this.stackable && "regular" == E || "100%" == E || this.fillToGraph)
				Ja = !0;
		for (O = K; O <= S; O++) {
			U = d[O];
			F = U.axes[f.id].graphs[b];
			F.index = O;var L,
				M,
				J,
				aa,
				na = NaN,
				D = NaN,
				C = NaN,
				P = NaN,
				N = NaN,
				Ka = NaN,
				za = NaN,
				La = NaN,
				Aa = NaN,
				Z = NaN,
				ca = NaN,
				oa = NaN,
				pa = NaN,
				V = NaN,
				cb = NaN,
				db = NaN,
				ia = NaN,
				la = void 0,
				wa = Eb,
				Ma = Ha,
				qa = ma,
				ja,
				ra;
			void 0 != F.color && (wa = F.color);F.fillColors && (wa = F.fillColors);isNaN(F.alpha) || (Ma = F.alpha);var sa = F.values;
			f.recalculateToPercents && (sa = F.percents);
			if (sa) {
				V = this.stackable && "none" != E && "3d" != E ? sa.close : sa.value;
				if ("candlestick" == g || "ohlc" == g) V = sa.close, db = sa.low, za = f.getCoordinate(db), cb = sa.high, Aa = f.getCoordinate(cb);
				ia = sa.open;
				C = f.getCoordinate(V);isNaN(ia) || (N = f.getCoordinate(ia));
				if (!Q) switch (this.showBalloonAt) {
					case "close":
						F.y = C;
						break;case "open":
						F.y = N;
						break;case "high":
						F.y = Aa;
						break;case "low":
						F.y = za
				}
				var na = U.x[Fa.id],
					ta = Math.floor($ / 2),
					Na = ta;
				"start" == this.pointPosition && (na -= $ / 2, ta = 0, Na = $);Q || (F.x = na);-1E5 > na && (na = -1E5);na > k + 1E5 && (na = k + 1E5);
				p ? (D = C, P = N, N = C = na, isNaN(ia) && !this.fillToGraph && (P = da), Ka = za, La = Aa) : (P = D = na, isNaN(ia) && !this.fillToGraph && (N = da));V < ia && (F.isNegative = !0, Ga && (wa = Ga), Ia && (Ma = Ia), void 0 != ya && (qa = ya));switch (g) {
				case "line":
					isNaN(V) ? s || (this.drawLineGraph(q, v, ea, fa), q = [], v = [], ea = [], fa = []) : (F.isNegative = V < ha ? !0 : !1, q.push(D), v.push(C), Z = D, ca = C, oa = D, pa = C, !Ja || isNaN(N) || isNaN(P) || (ea.push(P), fa.push(N)));
					break;case "smoothedLine":
					isNaN(V) ? s || (this.drawSmoothedGraph(q, v, ea, fa), q = [], v = [], ea = [], fa = []) : (F.isNegative = V < ha ? !0 : !1, q.push(D), v.push(C), Z = D, ca = C, oa = D, pa = C, !Ja || isNaN(N) || isNaN(P) || (ea.push(P), fa.push(N)));
					break;case "step":
					isNaN(V) ? s || (t = NaN, this.drawLineGraph(q, v, ea, fa), q = [], v = [], ea = [], fa = []) : (F.isNegative = V < ha ? !0 : !1, p ? (isNaN(u) || (q.push(u), v.push(C - ta)), v.push(C - ta), q.push(D), v.push(C + Na), q.push(D), !Ja || isNaN(N) || isNaN(P) || (ea.push(w), fa.push(N - ta), ea.push(P), fa.push(N - ta), ea.push(P), fa.push(N +
						Na))) : (isNaN(t) || (v.push(t), q.push(D - ta)), q.push(D - ta), v.push(C), q.push(D + Na), v.push(C), !Ja || isNaN(N) || isNaN(P) || (ea.push(P - ta), fa.push(y), ea.push(P - ta), fa.push(N), ea.push(P + Na), fa.push(N))), u = D, t = C, w = P, y = N, Z = D, ca = C, oa = D, pa = C);
					break;case "column":
					ja = qa;void 0 != F.lineColor && (ja = F.lineColor);
					if (!isNaN(V)) {
						V < ha ? (F.isNegative = !0, Ga && (wa = Ga), void 0 != ya && (ja = ya)) : F.isNegative = !1;
						var rb = f.min,
							sb = f.max;
						if (!(V < rb && ia < rb || V > sb && ia > sb))
							if (p) {
								"3d" == E ? (M = C - 0.5 * (h + B) + B / 2 + H * T, L = P + z * T) : (M = C - (r / 2 - T) * (h + B) + B / 2, L = P);
								J = h;
								Z = D;
								ca = M + h / 2;
								oa = D;
								pa = M + h / 2;M + J > l && (J = l - M);0 > M && (J += M, M = 0);
								aa = D - P;
								var Fb = L;
								L = AmCharts.fitToBounds(L, 0, k);
								aa += Fb - L;
								aa = AmCharts.fitToBounds(aa, -L, k - L + z * T);
								if (M < l && 0 < J && (la = new AmCharts.Cuboid(e, aa, J, z - a.d3x, H - a.d3y, wa, Ma, R, ja, W, G, n, p), "bottom" != I))
									if (I = f.reversed ? "left" : "right", 0 > V)
										I = f.reversed ? "right" : "left";
									else if ("regular" == E || "100%" == E)
										Z += this.dx
							} else {
								"3d" == E ? (L = D - 0.5 * (h + B) + B / 2 + z * T, M = N + H * T) : (L = D - (r / 2 - T) * (h + B) + B / 2, M = N);
								J = h;
								Z = L + h / 2;
								ca = C;
								oa = L + h / 2;
								pa = C;L + J > k + T * z && (J = k - L + T * z);0 > L && (J += L, L = 0);
								aa = C - N;
								var Gb = M;
								M = AmCharts.fitToBounds(M, this.dy, l);
								aa += Gb - M;
								aa = AmCharts.fitToBounds(aa, -M + H * T, l - M);
								if (L < k + T * z && 0 < J)
									if (la = new AmCharts.Cuboid(e, J, aa, z - a.d3x, H - a.d3y, wa, Ma, R, ja, this.lineAlpha, G, n, p), 0 > V && "middle" != I)
										I = "bottom";
									else if (I = ka, "regular" == E || "100%" == E)
										ca += this.dy
						}
						if (la && (ra = la.set, ra.translate(L, M), this.columnsSet.push(ra), (F.url || this.showHandOnHover) && ra.setAttr("cursor", "pointer"), !Q)) {
							"none" == E && (A = p ? (this.end + 1 - O) * x - c : x * O + c);"3d" == E && (p ? (A = (x - c) * (this.end + 1 - O), Z += z * this.columnIndex, oa += z * this.columnIndex, F.y += z * this.columnIndex) : (A = (x - c) * (O + 1), Z += 3, ca += H * this.columnIndex + 7, pa += H * this.columnIndex, F.y += H * this.columnIndex));
							if ("regular" == E || "100%" == E) I = "middle", A = p ? 0 < sa.value ? (this.end + 1 - O) * x + c : (this.end + 1 - O) * x - c : 0 < sa.value ? x * O + c : x * O - c;
							this.columnsArray.push({
								column : la,
								depth : A
							});
							F.x = p ? M + J / 2 : L + J / 2;this.ownColumns.push(la);this.animateColumns(la, O, D, P, C, N);this.addListeners(ra, F)
						}
					}
					break;case "candlestick":
					if (!isNaN(ia) && !isNaN(V)) {
						var Va,
							eb;
						ja = qa;void 0 != F.lineColor && (ja = F.lineColor);
						if (p) {
							if (M = C - h / 2, L = P, J = h, M + J > l && (J = l - M), 0 > M && (J += M, M = 0), M < l && 0 < J) {
								var fb,
									gb;
								V > ia ? (fb = [ D, La ], gb = [ P, Ka ]) : (fb = [ P, La ], gb = [ D, Ka ]);!isNaN(La) && !isNaN(Ka) && C < l && 0 < C && (Va = AmCharts.line(e, fb, [ C, C ], ja, W, R), eb = AmCharts.line(e, gb, [ C, C ], ja, W, R));
								aa = D - P;
								la = new AmCharts.Cuboid(e, aa, J, z, H, wa, Ha, R, ja, W, G, n, p)
							}
						} else if (L = D - h / 2, M = N + R / 2, J = h, L + J > k && (J = k - L), 0 > L && (J += L, L = 0), aa = C - N, L < k && 0 < J) {
							var la = new AmCharts.Cuboid(e, J, aa, z, H, wa, Ma, R, ja, W, G, n, p),
								hb,
								ib;
							V > ia ? (hb = [ C, Aa ], ib = [ N, za ]) : (hb = [ N, Aa ], ib = [ C, za ]);!isNaN(Aa) && !isNaN(za) && D < k && 0 < D && (Va = AmCharts.line(e, [ D, D ], hb, ja, W, R), eb = AmCharts.line(e, [ D, D ], ib, ja, W, R))
						}
						la && (ra = la.set, Y.push(ra), ra.translate(L, M - R / 2), (F.url || this.showHandOnHover) && ra.setAttr("cursor", "pointer"), Va && (Y.push(Va), Y.push(eb)), Z = D, ca = C, oa = D, pa = C, Q || (F.x = p ? M + J / 2 : L + J / 2, this.animateColumns(la, O, D, P, C, N), this.addListeners(ra, F)))
					}
					break;case "ohlc":
					if (!(isNaN(ia) || isNaN(cb) || isNaN(db) || isNaN(V))) {
						V < ia && (F.isNegative = !0, void 0 != ya && (qa = ya));
						var jb,
							kb,
							lb;
						if (p) {
							var mb = C - h / 2,
								mb = AmCharts.fitToBounds(mb, 0, l),
								tb = AmCharts.fitToBounds(C, 0, l),
								nb = C + h / 2,
								nb = AmCharts.fitToBounds(nb, 0, l);
							kb = AmCharts.line(e, [ P, P ], [ mb, tb ], qa, W, R, X);0 < C && C < l && (jb = AmCharts.line(e, [ Ka, La ], [ C, C ], qa, W, R, X));
							lb = AmCharts.line(e, [ D, D ], [ tb, nb ], qa, W, R, X)
						} else {
							var ob = D - h / 2,
								ob = AmCharts.fitToBounds(ob, 0, k),
								ub = AmCharts.fitToBounds(D, 0, k),
								pb = D + h / 2,
								pb = AmCharts.fitToBounds(pb, 0, k);
							kb = AmCharts.line(e, [ ob, ub ], [ N, N ], qa, W, R, X);0 < D && D < k && (jb = AmCharts.line(e, [ D, D ], [ za, Aa ], qa, W, R, X));
							lb = AmCharts.line(e, [ ub, pb ], [ C, C ], qa, W, R, X)
						}
						Y.push(kb);Y.push(jb);Y.push(lb);
						Z = D;
						ca = C;
						oa = D;
						pa = C
					}
				}
				if (!Q && !isNaN(V)) {
					var vb = this.hideBulletsCount;
					if (this.end - this.start <= vb || 0 === vb) {
						var Da = this.createBullet(F, oa, pa, O);
						Da || (Da = 0);
						var wb = this.labelText;
						if (wb) {
							var ba = this.createLabel(F, 0, 0, wb),
								xa = 0,
								Ba = 0,
								xb = ba.getBBox(),
								Wa = xb.width,
								Xa = xb.height;
							switch (I) {
							case "left":
								xa = -(Wa / 2 + Da / 2 + 3);
								break;case "top":
								Ba = -(Xa / 2 + Da / 2 + 3);
								break;case "right":
								xa = Da / 2 + 2 + Wa / 2;
								break;case "bottom":
								p && "column" == g ? (Z = da, 0 > V ? (xa = -6, ba.attr({
									"text-anchor" : "end"
								})) : (xa = 6, ba.attr({
									"text-anchor" : "start"
								}))) : (Ba = Da / 2 + Xa / 2, ba.x = -(Wa / 2 + 2));
								break;case "middle":
								"column" == g && (p ? (Ba = -(Xa / 2) + this.fontSize / 2, xa = -(D - P) / 2 - z, 0 > aa && (xa += z), Math.abs(D - P) < Wa && !this.showAllValueLabels && (ba.remove(), ba = null)) : (Ba = -(C - N) / 2, 0 > aa && (Ba -= H), Math.abs(C - N) < Xa && !this.showAllValueLabels && (ba.remove(), ba = null)))
							}
							if (ba) {
								if (isNaN(ca) || isNaN(Z)) ba.remove(), ba = null;
								else if (Z += xa, ca += Ba, ba.translate(Z, ca), p) {
									if (0 > ca || ca > l) ba.remove(), ba = null
								} else {
									var yb = 0;
									"3d" == E && (yb = z * T);
									if (0 > Z || Z > k + yb) ba.remove(), ba = null
								}
								ba && this.allBullets.push(ba)
							}
						}
						if ("column" == g && "regular" == E || "100%" == E) {
							var zb = f.totalText;
							if (zb) {
								var Ea = this.createLabel(F, 0, 0, zb, f.totalTextColor);
								this.allBullets.push(Ea);
								var Ab = Ea.getBBox(),
									Bb = Ab.width,
									Cb = Ab.height,
									Oa,
									Pa,
									Db = f.totals[O];
								Db && Db.remove();
								p ? (Pa = C, Oa = 0 > V ? D - Bb / 2 - 2 : D + Bb / 2 + 3) : (Oa = D, Pa = 0 > V ? C + Cb / 2 : C - Cb / 2 - 3);Ea.translate(Oa, Pa);
								f.totals[O] = Ea;
								p ? (0 > Pa || Pa > l) && Ea.remove() : (0 > Oa || Oa > k) && Ea.remove()
							}
						}
					}
				}
			}
		}
		if ("line" == g || "step" == g || "smoothedLine" == g) "smoothedLine" == g ? this.drawSmoothedGraph(q, v, ea, fa) : this.drawLineGraph(q, v, ea, fa), Q || this.launchAnimation();
		this.bulletsHidden && this.hideBullets()
	},
	animateColumns : function(a, b, c, d, e, f) {
		var g = this;
		c = g.chart.startDuration;0 < c && !g.animationPlayed && (g.seqAn ? (a.set.hide(), g.animationArray.push(a), a = setTimeout(function() {
			g.animate.call(g)
		}, 1E3 * (c / (g.end - g.start + 1)) * (b - g.start)), g.timeOuts.push(a)) : g.animate(a))
	},
	createLabel : function(a, b, c, d, e) {
		var f = this.chart,
			g = a.labelColor;
		void 0 === g && (g = this.color);void 0 === g && (g = f.color);void 0 !== e && (g = e);
		e = this.fontSize;void 0 === e && (this.fontSize = e = f.fontSize);
		a = f.formatString(d, a, this);
		a = AmCharts.cleanFromEmpty(a);
		f = AmCharts.text(this.container, a, g, f.fontFamily, e);f.translate(b, c);this.bulletSet.push(f);return f
	},
	positiveClip : function(a) {
		a.clipRect(this.pmx, this.pmy, this.pmw, this.pmh)
	},
	negativeClip : function(a) {
		a.clipRect(this.nmx, this.nmy, this.nmw, this.nmh)
	},
	drawLineGraph : function(a, b, c, d) {
		var e = this;
		if (1 < a.length) {
			var f = e.set,
				g = e.container,
				h = g.set(),
				k = g.set();
			f.push(k);f.push(h);
			var l = e.lineAlpha,
				m = e.lineThickness,
				p = e.dashLength,
				f = e.fillAlphas,
				r = e.lineColor,
				n = e.fillColors,
				s = e.negativeLineColor,
				q = e.negativeFillColors,
				v = e.negativeFillAlphas,
				u = e.baseCoord;
			0 !== e.negativeBase && (u = e.valueAxis.getCoordinate(e.negativeBase));
			r = AmCharts.line(g, a, b, r, l, m, p, !1, !0);h.push(r);h.click(function() {
				e.handleGraphClick()
			});void 0 !== s && (l = AmCharts.line(g, a, b, s, l, m, p, !1, !0), k.push(l));
			if (0 < f || 0 < v)
				if (l = a.join(";").split(";"), m = b.join(";").split(";"), "serial" == e.chartType && (0 < c.length ? (c.reverse(), d.reverse(), l = a.concat(c), m = b.concat(d)) : e.rotate ? (m.push(m[m.length - 1]), l.push(u), m.push(m[0]), l.push(u), m.push(m[0]), l.push(l[0])) : (l.push(l[l.length - 1]), m.push(u), l.push(l[0]), m.push(u), l.push(a[0]), m.push(m[0]))), 0 < f && (a = AmCharts.polygon(g, l, m, n, f, 0, 0, 0, this.gradientRotation), h.push(a)), q || void 0 !== s) isNaN(v) && (v = f), q || (q = s), g = AmCharts.polygon(g, l, m, q, v, 0, 0, 0, this.gradientRotation), k.push(g), k.click(function() {
						e.handleGraphClick()
					});
			e.applyMask(k, h)
		}
	},
	applyMask : function(a, b) {
		var c = a.length();
		"serial" != this.chartType || this.scrollbar || (this.positiveClip(b), 0 < c && this.negativeClip(a))
	},
	drawSmoothedGraph : function(a, b, c, d) {
		if (1 < a.length) {
			var e = this.set,
				f = this.container,
				g = f.set(),
				h = f.set();
			e.push(h);e.push(g);
			var k = this.lineAlpha,
				l = this.lineThickness,
				e = this.dashLength,
				m = this.fillAlphas,
				p = this.fillColors,
				r = this.negativeLineColor,
				n = this.negativeFillColors,
				s = this.negativeFillAlphas,
				q = this.baseCoord,
				v = new AmCharts.Bezier(f, a, b, this.lineColor, k, l, p, 0, e);
			g.push(v.path);void 0 !== r && (k = new AmCharts.Bezier(f, a, b, r, k, l, p, 0, e), h.push(k.path));0 < m && (l = a.join(";").split(";"), v = b.join(";").split(";"), k = "", 0 < c.length ? (c.reverse(), d.reverse(), l = a.concat(c), v = b.concat(d)) : (this.rotate ? (k += " L" + q + "," + b[b.length - 1], k += " L" + q + "," + b[0]) : (k += " L" + a[a.length - 1] + "," + q, k += " L" + a[0] + "," + q), k += " L" + a[0] + "," + b[0]), c = new AmCharts.Bezier(f, l, v, NaN, 0, 0, p, m, e, k), g.push(c.path), n || void 0 !== r) && (s || (s = m), n || (n = r), a = new AmCharts.Bezier(f, a, b, NaN, 0, 0, n, s, e, k), h.push(a.path));this.applyMask(h, g)
		}
	},
	launchAnimation : function() {
		var a = this,
			b = a.chart.startDuration;
		if (0 < b && !a.animationPlayed) {
			var c = a.set,
				d = a.bulletSet;
			AmCharts.VML || (c.attr({
				opacity : a.startAlpha
			}), d.attr({
				opacity : a.startAlpha
			}));c.hide();d.hide();
			a.seqAn ? (b = setTimeout(function() {
				a.animateGraphs.call(a)
			}, 1E3 * a.index * b), a.timeOuts.push(b)) : a.animateGraphs()
		}
	},
	animateGraphs : function() {
		var a = this.chart,
			b = this.set,
			c = this.bulletSet,
			d = this.x,
			e = this.y;
		b.show();c.show();
		var f = a.startDuration,
			a = a.startEffect;
		b && (this.rotate ? (b.translate(-1E3, e), c.translate(-1E3, e)) : (b.translate(d, -1E3), c.translate(d, -1E3)), b.animate({
			opacity : 1,
			translate : d + "," + e
		}, f, a), c.animate({
			opacity : 1,
			translate : d + "," + e
		}, f, a))
	},
	animate : function(a) {
		var b = this.chart,
			c = this.container,
			d = this.animationArray;
		!a && 0 < d.length && (a = d[0], d.shift());
		c = c[AmCharts.getEffect(b.startEffect)];
		b = b.startDuration;a && (this.rotate ? a.animateWidth(b, c) : a.animateHeight(b, c), a.set.show())
	},
	legendKeyColor : function() {
		var a = this.legendColor,
			b = this.lineAlpha;
		void 0 === a && (a = this.lineColor, 0 === b && (b = this.fillColors) && (a = "object" == typeof b ? b[0] : b));return a
	},
	legendKeyAlpha : function() {
		var a = this.legendAlpha;
		void 0 === a && (a = this.lineAlpha, 0 === a && this.fillAlphas && (a = this.fillAlphas), 0 === a && (a = this.bulletAlpha), 0 === a && (a = 1));return a
	},
	createBullet : function(a, b, c, d) {
		d = this.container;
		var e = this.bulletOffset,
			f = this.bulletSize;
		isNaN(a.bulletSize) || (f = a.bulletSize);
		if (!isNaN(this.maxValue)) {
			var g = a.values.value;
			isNaN(g) || (f = g / this.maxValue * this.maxBulletSize)
		}
		f < this.minBulletSize && (f = this.minBulletSize);
		this.rotate ? b += e : c -= e;
		var h,
			e = 0;
		if ("none" != this.bullet || a.bullet) {
			var k = this.bulletColor;
			a.isNegative && void 0 !== this.bulletColorNegative && (k = this.bulletColorNegative);void 0 !== a.color && (k = a.color);
			g = this.bullet;a.bullet && (g = a.bullet);
			var l = this.bulletBorderThickness,
				m = this.bulletBorderColor,
				p = this.bulletBorderAlpha,
				r = this.bulletAlpha,
				n = a.alpha;
			isNaN(n) || (r = n);switch (g) {
			case "round":
				h = AmCharts.circle(d, f / 2, k, r, l, m, p);
				break;case "square":
				h = AmCharts.polygon(d, [ 0, f, f, 0 ], [ 0, 0, f, f ], k, r, l, m, p);b -= f / 2;c -= f / 2;e = -f / 2;
				break;case "triangleUp":
				h = AmCharts.triangle(d, f, 0, k, r, l, m, p);
				break;case "triangleDown":
				h = AmCharts.triangle(d, f, 180, k, r, l, m, p);
				break;case "triangleLeft":
				h = AmCharts.triangle(d, f, 270, k, r, l, m, p);
				break;case "triangleRight":
				h = AmCharts.triangle(d, f, 90, k, r, l, m, p);
				break;case "bubble":
				h = AmCharts.circle(d, f / 2, k, r, l, m, p, !0)
			}
		}
		l = g = 0;
		if (this.customBullet || a.customBullet) m = this.customBullet, a.customBullet && (m = a.customBullet), m && (h && h.remove(), "function" == typeof m ? (h = new m, h.chart = this.chart, a.bulletConfig && (h.availableSpace = c, h.graph = this, a.bulletConfig.minCoord = this.minCoord - c, h.bulletConfig = a.bulletConfig), h.write(d), h = h.set) : (this.chart.path && (m = this.chart.path + m), h = d.image(m, 0, 0, f, f), this.centerCustomBullets && (b -= f / 2, c -= f / 2, g -= f / 2, l -= f / 2)));
		h && ((a.url || this.showHandOnHover) && h.setAttr("cursor", "pointer"), "serial" == this.chartType && (b - g < e || b - g > this.width || c < -f / 2 || c - l > this.height) && (h.remove(), h = null), h && (this.bulletSet.push(h), h.translate(b, c), this.addListeners(h, a), this.allBullets.push(h)));return f
	},
	showBullets : function() {
		var a = this.allBullets,
			b;
		this.bulletsHidden = !1;
		for (b = 0; b < a.length; b++) a[b].show()
	},
	hideBullets : function() {
		var a = this.allBullets,
			b;
		this.bulletsHidden = !0;
		for (b = 0; b < a.length; b++) a[b].hide()
	},
	addListeners : function(a, b) {
		var c = this;
		a.mouseover(function() {
			c.handleRollOver(b)
		}).mouseout(function() {
			c.handleRollOut(b)
		}).touchend(function() {
			c.handleRollOver(b)
		}).touchstart(function() {
			c.handleRollOver(b)
		}).click(function() {
			c.handleClick(b)
		}).dblclick(function() {
			c.handleDoubleClick(b)
		}).contextmenu(function() {
			c.handleRightClick(b)
		})
	},
	handleRollOver : function(a) {
		if (a) {
			var b = this.chart,
				c = {
					type : "rollOverGraphItem",
					item : a,
					index : a.index,
					graph : this,
					target : this,
					chart : this.chart
				};
			this.fire("rollOverGraphItem", c);b.fire("rollOverGraphItem", c);clearTimeout(b.hoverInt);
			c = this.showBalloon;b.chartCursor && "serial" == this.chartType && (c = !1, !b.chartCursor.valueBalloonsEnabled && this.showBalloon && (c = !0));
			if (c) {
				var c = b.formatString(this.balloonText, a, a.graph),
					d = this.balloonFunction;
				d && (c = d(a, a.graph));
				c = AmCharts.cleanFromEmpty(c);
				a = b.getBalloonColor(this, a);
				b.balloon.showBullet = !1;
				b.balloon.pointerOrientation = "V";b.showBalloon(c, a, !0)
			}
		}
	},
	handleRollOut : function(a) {
		this.chart.hideBalloon();a && (a = {
			type : "rollOutGraphItem",
			item : a,
			index : a.index,
			graph : this,
			target : this,
			chart : this.chart
		}, this.fire("rollOutGraphItem", a), this.chart.fire("rollOutGraphItem", a))
	},
	handleClick : function(a) {
		if (a) {
			var b = {
				type : "clickGraphItem",
				item : a,
				index : a.index,
				graph : this,
				target : this,
				chart : this.chart
			};
			this.fire("clickGraphItem", b);this.chart.fire("clickGraphItem", b);AmCharts.getURL(a.url, this.urlTarget)
		}
		this.handleGraphClick()
	},
	handleGraphClick : function() {
		var a = {
			type : "clickGraph",
			graph : this,
			target : this,
			chart : this.chart
		};
		this.fire("clickGraph", a);this.chart.fire("clickGraph", a)
	},
	handleRightClick : function(a) {
		a && (a = {
			type : "rightClickGraphItem",
			item : a,
			index : a.index,
			graph : this,
			target : this,
			chart : this.chart
		}, this.fire("rightClickGraphItem", a), this.chart.fire("rightClickGraphItem", a))
	},
	handleDoubleClick : function(a) {
		a && (a = {
			type : "doubleClickGraphItem",
			item : a,
			index : a.index,
			graph : this,
			target : this,
			chart : this.chart
		}, this.fire("doubleClickGraphItem", a), this.chart.fire("doubleClickGraphItem", a))
	},
	zoom : function(a, b) {
		this.start = a;
		this.end = b;this.draw()
	},
	changeOpacity : function(a) {
		var b = this.set;
		b && b.setAttr("opacity", a);
		if (b = this.ownColumns) {
			var c;
			for (c = 0; c < b.length; c++) {
				var d = b[c].set;
				d && d.setAttr("opacity", a)
			}
		}
		(b = this.bulletSet) && b.setAttr("opacity", a)
	},
	destroy : function() {
		AmCharts.remove(this.set);AmCharts.remove(this.bulletSet);
		var a = this.timeOuts;
		if (a) {
			var b;
			for (b = 0; b < a.length; b++) clearTimeout(a[b])
		}
		this.timeOuts = []
	}
});
AmCharts.ChartCursor = AmCharts.Class({
	construct : function() {
		this.createEvents("changed", "zoomed", "onHideCursor", "draw", "selected");
		this.enabled = !0;
		this.cursorAlpha = 1;
		this.selectionAlpha = 0.2;
		this.cursorColor = "#CC0000";
		this.categoryBalloonAlpha = 1;
		this.color = "#FFFFFF";
		this.type = "cursor";
		this.zoomed = !1;
		this.zoomable = !0;
		this.pan = !1;
		this.animate = !0;
		this.categoryBalloonDateFormat = "MMM DD, YYYY";
		this.categoryBalloonEnabled = this.valueBalloonsEnabled = !0;
		this.rolledOver = !1;
		this.cursorPosition = "middle";
		this.bulletsEnabled = this.skipZoomDispatch = !1;
		this.bulletSize = 8;
		this.selectWithoutZooming = this.oneBalloonOnly = !1
	},
	draw : function() {
		var a = this;
		a.destroy();
		var b = a.chart,
			c = b.container;
		a.rotate = b.rotate;
		a.container = c;
		c = c.set();c.translate(a.x, a.y);
		a.set = c;b.cursorSet.push(c);
		c = new AmCharts.AmBalloon;
		c.chart = b;
		a.categoryBalloon = c;
		c.cornerRadius = 0;
		c.borderThickness = 0;
		c.borderAlpha = 0;
		c.showBullet = !1;
		var d = a.categoryBalloonColor;
		void 0 === d && (d = a.cursorColor);
		c.fillColor = d;
		c.fillAlpha = a.categoryBalloonAlpha;
		c.borderColor = d;
		c.color = a.color;a.rotate && (c.pointerOrientation = "H");
		if (a.valueBalloonsEnabled)
			for (c = 0; c < b.graphs.length; c++) d = new AmCharts.AmBalloon, d.chart = b, AmCharts.copyProperties(b.balloon, d), b.graphs[c].valueBalloon = d;
		"cursor" == a.type ? a.createCursor() : a.createCrosshair();
		a.interval = setInterval(function() {
			a.detectMovement.call(a)
		}, 40)
	},
	updateData : function() {
		var a = this.chart;
		this.data = a.chartData;
		this.firstTime = a.firstTime;
		this.lastTime = a.lastTime
	},
	createCursor : function() {
		var a = this.chart,
			b = this.cursorAlpha,
			c = a.categoryAxis,
			d = c.position,
			e = c.inside,
			f = c.axisThickness,
			g = this.categoryBalloon,
			h,
			k,
			l = a.dx,
			m = a.dy,
			p = this.x,
			r = this.y,
			n = this.width,
			s = this.height,
			a = a.rotate,
			q = c.tickLength;
		g.pointerWidth = q;
		a ? (h = [ 0, n, n + l ], k = [ 0, 0, m ]) : (h = [ l, 0, 0 ], k = [ m, 0, s ]);
		this.line = b = AmCharts.line(this.container, h, k, this.cursorColor, b, 1);this.set.push(b);
		a ? (e && (g.pointerWidth = 0), "right" == d ? e ? g.setBounds(p, r + m, p + n + l, r + s + m) : g.setBounds(p + n + l + f, r + m, p + n + 1E3, r + s + m) : e ? g.setBounds(p, r, n + p, s + r) : g.setBounds(-1E3, -1E3, p - q - f, r + s + 15)) : (g.maxWidth = n, c.parseDates && (q = 0, g.pointerWidth = 0), "top" == d ? e ? g.setBounds(p + l, r + m, n + l + p, s + r) : g.setBounds(p + l, -1E3, n + l + p, r + m - q - f) : e ? g.setBounds(p, r, n + p, s + r - q) : g.setBounds(p, r + s + q + f - 1, p + n, r + s + q + f));this.hideCursor()
	},
	createCrosshair : function() {
		var a = this.cursorAlpha,
			b = this.container,
			c = AmCharts.line(b, [ 0, 0 ], [ 0, this.height ], this.cursorColor, a, 1),
			a = AmCharts.line(b, [ 0, this.width ], [ 0, 0 ], this.cursorColor, a, 1);
		this.set.push(c);this.set.push(a);
		this.vLine = c;
		this.hLine = a;this.hideCursor()
	},
	detectMovement : function() {
		var a = this.chart;
		if (a.mouseIsOver) {
			var b = a.mouseX - this.x,
				c = a.mouseY - this.y;
			0 < b && b < this.width && 0 < c && c < this.height ? (this.drawing ? this.rolledOver || a.setMouseCursor("crosshair") : this.pan && (this.rolledOver || a.setMouseCursor("move")), this.rolledOver = !0, this.setPosition()) : this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
		} else this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
	},
	getMousePosition : function() {
		var a,
			b = this.width,
			c = this.height;
		a = this.chart;
		this.rotate ? (a = a.mouseY - this.y, 0 > a && (a = 0), a > c && (a = c)) : (a = a.mouseX - this.x, 0 > a && (a = 0), a > b && (a = b));return a
	},
	updateCrosshair : function() {
		var a = this.chart,
			b = a.mouseX - this.x,
			c = a.mouseY - this.y,
			d = this.vLine,
			e = this.hLine,
			b = AmCharts.fitToBounds(b, 0, this.width),
			c = AmCharts.fitToBounds(c, 0, this.height);
		0 < this.cursorAlpha && (d.show(), e.show(), d.translate(b, 0), e.translate(0, c));this.zooming && (a.hideXScrollbar && (b = NaN), a.hideYScrollbar && (c = NaN), this.updateSelectionSize(b, c));a.mouseIsOver || this.zooming || this.hideCursor()
	},
	updateSelectionSize : function(a, b) {
		AmCharts.remove(this.selection);
		var c = this.selectionPosX,
			d = this.selectionPosY,
			e = 0,
			f = 0,
			g = this.width,
			h = this.height;
		isNaN(a) || (c > a && (e = a, g = c - a), c < a && (e = c, g = a - c), c == a && (e = a, g = 0));isNaN(b) || (d > b && (f = b, h = d - b), d < b && (f = d, h = b - d), d == b && (f = b, h = 0));0 < g && 0 < h && (c = AmCharts.rect(this.container, g, h, this.cursorColor, this.selectionAlpha), c.translate(e + this.x, f + this.y), this.selection = c)
	},
	arrangeBalloons : function() {
		var a = this.valueBalloons,
			b = this.x,
			c = this.y,
			d = this.height + c;
		a.sort(thispareY);
		var e;
		for (e = 0; e < a.length; e++) {
			var f = a[e].balloon;
			f.setBounds(b, c, b + this.width, d);f.draw();
			d = f.yPos - 3
		}
		this.arrangeBalloons2()
	},
	compareY : function(a, b) {
		return a.yy < b.yy ? 1 : -1
	},
	arrangeBalloons2 : function() {
		var a = this.valueBalloons;
		a.reverse();
		var b,
			c = this.x,
			d,
			e;
		for (e = 0; e < a.length; e++) {
			var f = a[e].balloon;
			b = f.bottom;var g = f.bottom - f.yPos;
			0 < e && b - g < d + 3 && (f.setBounds(c, d + 3, c + this.width, d + g + 3), f.draw());f.set && f.set.show();
			d = f.bottom
		}
	},
	showBullets : function() {
		AmCharts.remove(this.allBullets);
		var a = this.container,
			b = a.set();
		this.set.push(b);this.set.show();
		this.allBullets = b;
		var b = this.chart.graphs,
			c;
		for (c = 0; c < b.length; c++) {
			var d = b[c];
			if (!d.hidden && d.balloonText) {
				var e = this.data[this.index].axes[d.valueAxis.id].graphs[d.id],
					f = e.y;
				if (!isNaN(f)) {
					var g,
						h;
					g = e.x;
					this.rotate ? (h = f, f = g) : h = g;
					d = AmCharts.circle(a, this.bulletSize / 2, this.chart.getBalloonColor(d, e), d.cursorBulletAlpha);d.translate(h, f);this.allBullets.push(d)
				}
			}
		}
	},
	destroy : function() {
		this.clear();AmCharts.remove(this.selection);
		this.selection = null;
		var a = this.categoryBalloon;
		a && a.destroy();this.destroyValueBalloons();AmCharts.remove(this.set)
	},
	clear : function() {
		clearInterval(this.interval)
	},
	destroyValueBalloons : function() {
		var a = this.valueBalloons;
		if (a) {
			var b;
			for (b = 0; b < a.length; b++) a[b].balloon.hide()
		}
	},
	zoom : function(a, b, c, d) {
		var e = this.chart;
		this.destroyValueBalloons();
		this.zooming = !1;
		var f;
		this.rotate ? this.selectionPosY = f = e.mouseY : this.selectionPosX = f = e.mouseX;
		this.start = a;
		this.end = b;
		this.startTime = c;
		this.endTime = d;
		this.zoomed = !0;
		var g = e.categoryAxis,
			e = this.rotate;
		f = this.width;
		var h = this.height;
		g.parseDates && !g.equalSpacing ? (a = d - c + g.minDuration(), a = e ? h / a : f / a) : a = e ? h / (b - a) : f / (b - a);
		this.stepWidth = a;this.setPosition();this.hideCursor()
	},
	hideObj : function(a) {
		a && a.hide()
	},
	hideCursor : function(a) {
		void 0 === a && (a = !0);this.hideObj(this.set);this.hideObj(this.categoryBalloon);this.hideObj(this.line);this.hideObj(this.vLine);this.hideObj(this.hLine);this.hideObj(this.allBullets);this.destroyValueBalloons();this.selectWithoutZooming || AmCharts.remove(this.selection);
		this.previousIndex = NaN;a && this.fire("onHideCursor", {
			type : "onHideCursor",
			chart : this.chart,
			target : this
		});this.drawing || this.chart.setMouseCursor("auto")
	},
	setPosition : function(a, b) {
		void 0 === b && (b = !0);
		if ("cursor" == this.type) {
			if (AmCharts.ifArray(this.data)) {
				isNaN(a) && (a = this.getMousePosition());
				if ((a != this.previousMousePosition || !0 === this.zoomed || this.oneBalloonOnly) && !isNaN(a)) {
					var c = this.chart.categoryAxis.xToIndex(a);
					if (c != this.previousIndex || this.zoomed || "mouse" == this.cursorPosition || this.oneBalloonOnly) this.updateCursor(c, b), this.zoomed = !1
				}
				this.previousMousePosition = a
			}
		} else this.updateCrosshair()
	},
	updateCursor : function(a, b) {
		var c = this.chart,
			d = c.mouseX - this.x,
			e = c.mouseY - this.y;
		this.drawingNow && (AmCharts.remove(this.drawingLine), this.drawingLine = AmCharts.line(this.container, [ this.x + this.drawStartX, this.x + d ], [ this.y + this.drawStartY, this.y + e ], this.cursorColor, 1, 1));
		if (this.enabled) {
			void 0 === b && (b = !0);
			this.index = a;
			var f = c.categoryAxis,
				g = c.dx,
				h = c.dy,
				k = this.x,
				l = this.y,
				m = this.width,
				p = this.height,
				r = this.data[a];
			if (r) {
				var n = r.x[f.id],
					s = c.rotate,
					q = f.inside,
					v = this.stepWidth,
					u = this.categoryBalloon,
					t = this.firstTime,
					w = this.lastTime,
					y = this.cursorPosition,
					x = f.position,
					A = this.zooming,
					z = this.panning,
					H = c.graphs,
					E = f.axisThickness;
				if (c.mouseIsOver || A || z || this.forceShow)
					if (this.forceShow = !1, z) {
						var g = this.panClickPos,
							c = this.panClickEndTime,
							A = this.panClickStartTime,
							I = this.panClickEnd,
							k = this.panClickStart,
							d = (s ? g - e : g - d) / v;
						if (!f.parseDates || f.equalSpacing)
							d = Math.round(d);
						0 !== d && (g = {
							type : "zoomed",
							target : this
						}, g.chart = this.chart, f.parseDates && !f.equalSpacing ? (c + d > w && (d = w - c), A + d < t && (d = t - A), g.start = A + d, g.end = c + d, this.fire(g.type, g)) : I + d >= this.data.length || 0 > k + d || (g.start = k + d, g.end = I + d, this.fire(g.type, g)))
					} else {
						"start" == y && (n -= f.cellWidth / 2);"mouse" == y && c.mouseIsOver && (n = s ? e - 2 : d - 2);
						if (s) {
							if (0 > n)
								if (A)
									n = 0;else {
									this.hideCursor();return
							}
							if (n > p + 1)
								if (A)
									n = p + 1;else {
									this.hideCursor();return
							}
						} else {
							if (0 > n)
								if (A)
									n = 0;else {
									this.hideCursor();return
							}
							if (n > m)
								if (A)
									n = m;else {
									this.hideCursor();return
							}
						}
						0 < this.cursorAlpha && (t = this.line, s ? t.translate(0, n + h) : t.translate(n, 0), t.show());
						this.linePos = s ? n + h : n;A && (s ? this.updateSelectionSize(NaN, n) : this.updateSelectionSize(n, NaN));
						t = !0;A && (t = !1);
						this.categoryBalloonEnabled && t ? (s ? (q && ("right" == x ? u.setBounds(k, l + h, k + m + g, l + n + h) : u.setBounds(k, l + h, k + m + g, l + n)), "right" == x ? q ? u.setPosition(k + m + g, l + n + h) : u.setPosition(k + m + g + E, l + n + h) : q ? u.setPosition(k, l + n) : u.setPosition(k - E, l + n)) : "top" == x ? q ? u.setPosition(k + n + g, l + h) : u.setPosition(k + n + g, l + h - E + 1) : q ? u.setPosition(k + n, l + p) : u.setPosition(k + n, l + p + E - 1), (w = this.categoryBalloonFunction) ? u.showBalloon(w(r.category)) : f.parseDates ? (f = AmCharts.formatDate(r.category, this.categoryBalloonDateFormat), -1 != f.indexOf("fff") && (f = AmCharts.formatMilliseconds(f, r.category)), u.showBalloon(f)) : u.showBalloon(r.category)) : u.hide();H && this.bulletsEnabled && this.showBullets();this.destroyValueBalloons();
						if (H && this.valueBalloonsEnabled && t && c.balloon.enabled) {
							this.valueBalloons = t = [];
							if (this.oneBalloonOnly) {
								h = Infinity;
								for (f = 0; f < H.length; f++) w = H[f], w.showBalloon && !w.hidden && w.balloonText && (v = r.axes[w.valueAxis.id].graphs[w.id], u = v.y, isNaN(u) || (s ? Math.abs(d - u) < h && (h = Math.abs(d - u), I = w) : Math.abs(e - u) < h && (h = Math.abs(e - u), I = w)));
								this.mostCloseGraph && (I = this.mostCloseGraph)
							}
							for (f = 0; f < H.length; f++)
								if (w = H[f], (!this.oneBalloonOnly || w == I) && w.showBalloon && !w.hidden && w.balloonText && (v = r.axes[w.valueAxis.id].graphs[w.id], u = v.y, !isNaN(u))) {
									q = v.x;
									n = !0;
									if (s) {
										if (h = u, 0 > q || q > p)
											n = !1
									} else if (h = q, q = u, 0 > h || h > m + g)
										n = !1;
									n && (n = w.valueBalloon, x = c.getBalloonColor(w, v), n.setBounds(k, l, k + m, l + p), n.pointerOrientation = "H", n.changeColor(x), void 0 !== w.balloonAlpha && (n.fillAlpha = w.balloonAlpha), void 0 !== w.balloonTextColor && (n.color = w.balloonTextColor), n.setPosition(h + k, q + l), h = c.formatString(w.balloonText, v, w), (q = w.balloonFunction) && (h = q(v, w)), "" !== h && n.showBalloon(h), !s && n.set && n.set.hide(), t.push({
										yy : u,
										balloon : n
									}))
							}
							s || this.arrangeBalloons()
						}
						b ? (g = {
							type : "changed"
						}, g.index = a, g.target = this, g.chart = this.chart, g.zooming = A, g.mostCloseGraph = I, g.position = s ? e : d, g.target = this, c.fire("changed", g), this.fire("changed", g), this.skipZoomDispatch = !1) : (this.skipZoomDispatch = !0, c.updateLegendValues(a));
						this.previousIndex = a
				}
			}
		} else this.hideCursor()
	},
	enableDrawing : function(a) {
		this.enabled = !a;this.hideCursor();
		this.rolledOver = !1;
		this.drawing = a
	},
	isZooming : function(a) {
		a && a != this.zooming && this.handleMouseDown("fake");a || a == this.zooming || this.handleMouseUp()
	},
	handleMouseOut : function() {
		if (this.enabled)
			if (this.zooming) this.setPosition();else {
				this.index = void 0;
				var a = {
					type : "changed",
					index : void 0,
					target : this
				};
				a.chart = this.chart;this.fire("changed", a);this.hideCursor()
		}
	},
	handleReleaseOutside : function() {
		this.handleMouseUp()
	},
	handleMouseUp : function() {
		var a = this.chart,
			b = this.data,
			c;
		if (a) {
			var d = a.mouseX - this.x,
				e = a.mouseY - this.y;
			if (this.drawingNow) {
				this.drawingNow = !1;AmCharts.remove(this.drawingLine);
				c = this.drawStartX;
				var f = this.drawStartY;
				if (2 < Math.abs(c - d) || 2 < Math.abs(f - e)) c = {
						type : "draw",
						target : this,
						chart : a,
						initialX : c,
						initialY : f,
						finalX : d,
						finalY : e
					}, this.fire(c.type, c)
			}
			if (this.enabled && 0 < b.length) {
				if (this.pan)
					this.rolledOver = !1;
				else if (this.zoomable && this.zooming) {
					c = this.selectWithoutZooming ? {
						type : "selected"
					} : {
						type : "zoomed"
					};
					c.target = this;
					c.chart = a;
					if ("cursor" == this.type) this.rotate ? this.selectionPosY = e : this.selectionPosX = e = d, 2 > Math.abs(e - this.initialMouse) && this.fromIndex == this.index || (this.index < this.fromIndex ? (c.end = this.fromIndex, c.start = this.index) : (c.end = this.index, c.start = this.fromIndex), e = a.categoryAxis, e.parseDates && !e.equalSpacing && (c.start = b[c.start].time, c.end = a.getEndTime(b[c.end].time)), this.skipZoomDispatch || this.fire(c.type, c));else {
						var g = this.initialMouseX,
							h = this.initialMouseY;
						3 > Math.abs(d - g) && 3 > Math.abs(e -
							h) || (b = Math.min(g, d), f = Math.min(h, e), d = Math.abs(g - d), e = Math.abs(h - e), a.hideXScrollbar && (b = 0, d = this.width), a.hideYScrollbar && (f = 0, e = this.height), c.selectionHeight = e, c.selectionWidth = d, c.selectionY = f, c.selectionX = b, this.skipZoomDispatch || this.fire(c.type, c))
					}
					this.selectWithoutZooming || AmCharts.remove(this.selection)
				}
				this.panning = this.zooming = this.skipZoomDispatch = !1
			}
		}
	},
	showCursorAt : function(a) {
		var b = this.chart.categoryAxis;
		a = b.parseDates ? b.dateToCoordinate(a) : b.categoryToCoordinate(a);
		this.previousMousePosition = NaN;
		this.forceShow = !0;this.setPosition(a, !1)
	},
	handleMouseDown : function(a) {
		if (this.zoomable || this.pan || this.drawing) {
			var b = this.rotate,
				c = this.chart,
				d = c.mouseX - this.x,
				e = c.mouseY - this.y;
			if (0 < d && d < this.width && 0 < e && e < this.height || "fake" == a) this.setPosition(), this.selectWithoutZooming && AmCharts.remove(this.selection), this.drawing ? (this.drawStartY = e, this.drawStartX = d, this.drawingNow = !0) : this.pan ? (this.zoomable = !1, c.setMouseCursor("move"), this.panning = !0, this.panClickPos = b ? e : d, this.panClickStart = this.start, this.panClickEnd = this.end, this.panClickStartTime = this.startTime, this.panClickEndTime = this.endTime) : this.zoomable && ("cursor" == this.type ? (this.fromIndex = this.index, b ? (this.initialMouse = e, this.selectionPosY = this.linePos) : (this.initialMouse = d, this.selectionPosX = this.linePos)) : (this.initialMouseX = d, this.initialMouseY = e, this.selectionPosX = d, this.selectionPosY = e), this.zooming = !0)
		}
	}
});
AmCharts.SimpleChartScrollbar = AmCharts.Class({
	construct : function() {
		this.createEvents("zoomed");
		this.backgroundColor = "#D4D4D4";
		this.backgroundAlpha = 1;
		this.selectedBackgroundColor = "#EFEFEF";
		this.scrollDuration = this.selectedBackgroundAlpha = 1;
		this.resizeEnabled = !0;
		this.hideResizeGrips = !1;
		this.scrollbarHeight = 20;
		this.updateOnReleaseOnly = !1;9 > document.documentMode && (this.updateOnReleaseOnly = !0);
		this.dragIconWidth = 11;
		this.dragIconHeight = 18
	},
	draw : function() {
		var a = this;
		a.destroy();
		a.interval = setInterval(function() {
			a.updateScrollbar.call(a)
		}, 40);
		var b = a.chart.container,
			c = a.rotate,
			d = a.chart,
			e = b.set();
		a.set = e;d.scrollbarsSet.push(e);
		var f,
			g;
		c ? (f = a.scrollbarHeight, g = d.plotAreaHeight) : (g = a.scrollbarHeight, f = d.plotAreaWidth);
		a.width = f;
		if ((a.height = g) && f) {
			var h = AmCharts.rect(b, f, g, a.backgroundColor, a.backgroundAlpha);
			a.bg = h;e.push(h);
			h = AmCharts.rect(b, f, g, "#000", 0.005);e.push(h);
			a.invisibleBg = h;h.click(function() {
				a.handleBgClick()
			}).mouseover(function() {
				a.handleMouseOver()
			}).mouseout(function() {
				a.handleMouseOut()
			}).touchend(function() {
				a.handleBgClick()
			});
			h = AmCharts.rect(b, f, g, a.selectedBackgroundColor, a.selectedBackgroundAlpha);
			a.selectedBG = h;e.push(h);
			f = AmCharts.rect(b, f, g, "#000", 0.005);
			a.dragger = f;e.push(f);f.mousedown(function(b) {
				a.handleDragStart(b)
			}).mouseup(function() {
				a.handleDragStop()
			}).mouseover(function() {
				a.handleDraggerOver()
			}).mouseout(function() {
				a.handleMouseOut()
			}).touchstart(function(b) {
				a.handleDragStart(b)
			}).touchend(function() {
				a.handleDragStop()
			});
			f = d.pathToImages;
			c ? (h = f + "dragIconH.gif", f = a.dragIconWidth, c = a.dragIconHeight) : (h = f +
				"dragIcon.gif", c = a.dragIconWidth, f = a.dragIconHeight);
			g = b.image(h, 0, 0, c, f);
			var h = b.image(h, 0, 0, c, f),
				k = 10,
				l = 20;
			d.panEventsEnabled && (k = 25, l = a.scrollbarHeight);
			var m = AmCharts.rect(b, k, l, "#000", 0.005),
				p = AmCharts.rect(b, k, l, "#000", 0.005);
			p.translate(-(k - c) / 2, -(l - f) / 2);m.translate(-(k - c) / 2, -(l - f) / 2);
			c = b.set([ g, p ]);
			b = b.set([ h, m ]);
			a.iconLeft = c;e.push(a.iconLeft);
			a.iconRight = b;e.push(b);c.mousedown(function() {
				a.leftDragStart()
			}).mouseup(function() {
				a.leftDragStop()
			}).mouseover(function() {
				a.iconRollOver()
			}).mouseout(function() {
				a.iconRollOut()
			}).touchstart(function(b) {
				a.leftDragStart()
			}).touchend(function() {
				a.leftDragStop()
			});b.mousedown(function() {
				a.rightDragStart()
			}).mouseup(function() {
				a.rightDragStop()
			}).mouseover(function() {
				a.iconRollOver()
			}).mouseout(function() {
				a.iconRollOut()
			}).touchstart(function(b) {
				a.rightDragStart()
			}).touchend(function() {
				a.rightDragStop()
			});
			AmCharts.ifArray(d.chartData) ? e.show() : e.hide();a.hideDragIcons()
		}
		e.translate(a.x, a.y);a.clipDragger(!1)
	},
	updateScrollbarSize : function(a, b) {
		var c = this.dragger,
			d,
			e,
			f,
			g;
		this.rotate ? (d = 0, e = a, f = this.width + 1, g = b - a, c.setAttr("height", b - a), c.setAttr("y", e)) : (d = a, e = 0, f = b - a, g = this.height + 1, c.setAttr("width", b - a), c.setAttr("x", d));this.clipAndUpdate(d, e, f, g)
	},
	updateScrollbar : function() {
		var a,
			b = !1,
			c,
			d,
			e = this.x,
			f = this.y,
			g = this.dragger,
			h = this.getDBox();
		c = h.x + e;
		d = h.y + f;
		var k = h.width,
			h = h.height,
			l = this.rotate,
			m = this.chart,
			p = this.width,
			r = this.height,
			n = m.mouseX,
			s = m.mouseY;
		a = this.initialMouse;m.mouseIsOver && (this.dragging && (m = this.initialCoord, l ? (a = m + (s - a), 0 > a && (a = 0), m = r - h, a > m && (a = m), g.setAttr("y", a)) : (a = m + (n - a), 0 > a && (a = 0), m = p - k, a > m && (a = m), g.setAttr("x", a))), this.resizingRight && (l ? (a = s - d, a + d > r + f && (a = r - d + f), 0 > a ? (this.resizingRight = !1, b = this.resizingLeft = !0) : (0 === a && (a = 0.1), g.setAttr("height", a))) : (a = n - c, a + c > p + e && (a = p - c + e), 0 > a ? (this.resizingRight = !1, b = this.resizingLeft = !0) : (0 === a && (a = 0.1), g.setAttr("width", a)))), this.resizingLeft && (l ? (c = d, d = s, d < f && (d = f), d > r + f && (d = r + f), a = !0 === b ? c - d : h + c - d, 0 > a ? (this.resizingRight = !0, this.resizingLeft = !1, g.setAttr("y", c + h - f)) : (0 === a && (a = 0.1), g.setAttr("y", d - f), g.setAttr("height", a))) : (d = n, d < e && (d = e), d > p + e && (d = p + e), a = !0 === b ? c - d : k + c - d, 0 > a ? (this.resizingRight = !0, this.resizingLeft = !1, g.setAttr("x", c + k - e)) : (0 === a && (a = 0.1), g.setAttr("x", d - e), g.setAttr("width", a)))), this.clipDragger(!0))
	},
	clipDragger : function(a) {
		var b = this.getDBox(),
			c = b.x,
			d = b.y,
			e = b.width,
			b = b.height,
			f = !1;
		if (this.rotate) {
			if (c = 0, e = this.width + 1, this.clipY != d || this.clipH != b)
				f = !0
		} else if (d = 0, b = this.height + 1, this.clipX != c || this.clipW != e)
			f = !0;
		f && (this.clipAndUpdate(c, d, e, b), a && (this.updateOnReleaseOnly || this.dispatchScrollbarEvent()))
	},
	maskGraphs : function() {},
	clipAndUpdate : function(a, b, c, d) {
		this.clipX = a;
		this.clipY = b;
		this.clipW = c;
		this.clipH = d;this.selectedBG.clipRect(a, b, c, d);this.updateDragIconPositions();this.maskGraphs(a, b, c, d)
	},
	dispatchScrollbarEvent : function() {
		if (this.skipEvent)
			this.skipEvent = !1;else {
			var a = this.chart;
			a.hideBalloon();
			var b = this.getDBox(),
				c = b.x,
				d = b.y,
				e = b.width,
				b = b.height;
			this.rotate ? (c = d, e = this.height / b) : e = this.width / e;
			a = {
				type : "zoomed",
				position : c,
				chart : a,
				target : this,
				multiplier : e
			};this.fire(a.type, a)
		}
	},
	updateDragIconPositions : function() {
		var a = this.getDBox(),
			b = a.x,
			c = a.y,
			d = this.iconLeft,
			e = this.iconRight,
			f,
			g,
			h = this.scrollbarHeight;
		this.rotate ? (f = this.dragIconWidth, g = this.dragIconHeight, d.translate((h - g) / 2, c - f / 2), e.translate((h - g) / 2, c + a.height - f / 2)) : (f = this.dragIconHeight, g = this.dragIconWidth, d.translate(b - g / 2, (h - f) / 2), e.translate(b + -g / 2 + a.width, (h - f) / 2))
	},
	showDragIcons : function() {
		this.resizeEnabled && (this.iconLeft.show(), this.iconRight.show())
	},
	hideDragIcons : function() {
		this.resizingLeft || this.resizingRight || this.dragging || (this.hideResizeGrips && (this.iconLeft.hide(), this.iconRight.hide()), this.removeCursors())
	},
	removeCursors : function() {
		this.chart.setMouseCursor("auto")
	},
	relativeZoom : function(a, b) {
		this.dragger.stop();
		this.multiplier = a;
		this.position = b;this.updateScrollbarSize(b, this.rotate ? b + this.height / a : b + this.width / a)
	},
	destroy : function() {
		this.clear();AmCharts.remove(this.set)
	},
	clear : function() {
		clearInterval(this.interval)
	},
	handleDragStart : function() {
		var a = this.chart;
		this.dragger.stop();this.removeCursors();
		this.dragging = !0;
		var b = this.getDBox();
		this.rotate ? (this.initialCoord = b.y, this.initialMouse = a.mouseY) : (this.initialCoord = b.x, this.initialMouse = a.mouseX)
	},
	handleDragStop : function() {
		this.updateOnReleaseOnly && (this.updateScrollbar(), this.skipEvent = !1, this.dispatchScrollbarEvent());
		this.dragging = !1;this.mouseIsOver && this.removeCursors();this.updateScrollbar()
	},
	handleDraggerOver : function() {
		this.handleMouseOver()
	},
	leftDragStart : function() {
		this.dragger.stop();
		this.resizingLeft = !0
	},
	leftDragStop : function() {
		this.resizingLeft = !1;this.mouseIsOver || this.removeCursors();this.updateOnRelease()
	},
	rightDragStart : function() {
		this.dragger.stop();
		this.resizingRight = !0
	},
	rightDragStop : function() {
		this.resizingRight = !1;this.mouseIsOver || this.removeCursors();this.updateOnRelease()
	},
	iconRollOut : function() {
		this.removeCursors()
	},
	iconRollOver : function() {
		this.rotate ? this.chart.setMouseCursor("n-resize") : this.chart.setMouseCursor("e-resize");this.handleMouseOver()
	},
	getDBox : function() {
		return this.dragger.getBBox()
	},
	handleBgClick : function() {
		if (!this.resizingRight && !this.resizingLeft) {
			this.zooming = !0;
			var a,
				b,
				c = this.scrollDuration,
				d = this.dragger;
			a = this.getDBox();
			var e = a.height,
				f = a.width;
			b = this.chart;
			var g = this.y,
				h = this.x,
				k = this.rotate;
			k ? (a = "y", b = b.mouseY - e / 2 - g, b = AmCharts.fitToBounds(b, 0, this.height - e)) : (a = "x", b = b.mouseX - f / 2 - h, b = AmCharts.fitToBounds(b, 0, this.width - f));
			this.updateOnReleaseOnly ? (this.skipEvent = !1, d.setAttr(a, b), this.dispatchScrollbarEvent(), this.clipDragger()) : (b = Math.round(b), k ? d.animate({
				y : b
			}, c, ">") : d.animate({
				x : b
			}, c, ">"))
		}
	},
	updateOnRelease : function() {
		this.updateOnReleaseOnly && (this.updateScrollbar(), this.skipEvent = !1, this.dispatchScrollbarEvent())
	},
	handleReleaseOutside : function() {
		if (this.set) {
			if (this.resizingLeft || this.resizingRight || this.dragging) this.updateOnRelease(), this.removeCursors();
			this.mouseIsOver = this.dragging = this.resizingRight = this.resizingLeft = !1;this.hideDragIcons();this.updateScrollbar()
		}
	},
	handleMouseOver : function() {
		this.mouseIsOver = !0;this.showDragIcons()
	},
	handleMouseOut : function() {
		this.mouseIsOver = !1;this.hideDragIcons()
	}
});
AmCharts.ChartScrollbar = AmCharts.Class({
	inherits : AmCharts.SimpleChartScrollbar,
	construct : function() {
		AmCharts.ChartScrollbar.base.construct.call(this);
		this.graphLineColor = "#BBBBBB";
		this.graphLineAlpha = 0;
		this.graphFillColor = "#BBBBBB";
		this.graphFillAlpha = 1;
		this.selectedGraphLineColor = "#888888";
		this.selectedGraphLineAlpha = 0;
		this.selectedGraphFillColor = "#888888";
		this.selectedGraphFillAlpha = 1;
		this.gridCount = 0;
		this.gridColor = "#FFFFFF";
		this.gridAlpha = 0.7;
		this.skipEvent = this.autoGridCount = !1;
		this.color = "#FFFFFF";
		this.scrollbarCreated = !1
	},
	init : function() {
		var a = this.categoryAxis,
			b = this.chart;
		a || (this.categoryAxis = a = new AmCharts.CategoryAxis);
		a.chart = b;
		a.id = "scrollbar";
		a.dateFormats = b.categoryAxis.dateFormats;
		a.boldPeriodBeginning = b.categoryAxis.boldPeriodBeginning;
		a.axisItemRenderer = AmCharts.RecItem;
		a.axisRenderer = AmCharts.RecAxis;
		a.guideFillRenderer = AmCharts.RecFill;
		a.inside = !0;
		a.fontSize = this.fontSize;
		a.tickLength = 0;
		a.axisAlpha = 0;this.graph && (a = this.valueAxis, a || (this.valueAxis = a = new AmCharts.ValueAxis, a.visible = !1, a.scrollbar = !0, a.axisItemRenderer = AmCharts.RecItem, a.axisRenderer = AmCharts.RecAxis, a.guideFillRenderer = AmCharts.RecFill, a.labelsEnabled = !1, a.chart = b), b = this.unselectedGraph, b || (b = new AmCharts.AmGraph, b.scrollbar = !0, this.unselectedGraph = b, b.negativeBase = this.graph.negativeBase), b = this.selectedGraph, b || (b = new AmCharts.AmGraph, b.scrollbar = !0, this.selectedGraph = b, b.negativeBase = this.graph.negativeBase));
		this.scrollbarCreated = !0
	},
	draw : function() {
		var a = this;
		AmCharts.ChartScrollbar.base.draw.call(a);a.scrollbarCreated || a.init();
		var b = a.chart,
			c = b.chartData,
			d = a.categoryAxis,
			e = a.rotate,
			f = a.x,
			g = a.y,
			h = a.width,
			k = a.height,
			l = b.categoryAxis,
			m = a.set;
		d.setOrientation(!e);
		d.parseDates = l.parseDates;
		d.rotate = e;
		d.equalSpacing = l.equalSpacing;
		d.minPeriod = l.minPeriod;
		d.startOnAxis = l.startOnAxis;
		d.viW = h;
		d.viH = k;
		d.width = h;
		d.height = k;
		d.gridCount = a.gridCount;
		d.gridColor = a.gridColor;
		d.gridAlpha = a.gridAlpha;
		d.color = a.color;
		d.autoGridCount = a.autoGridCount;d.parseDates && !d.equalSpacing && d.timeZoom(b.firstTime, b.lastTime);d.zoom(0, c.length - 1);
		if (l = a.graph) {
			var p = a.valueAxis,
				r = l.valueAxis;
			p.id = r.id;
			p.rotate = e;p.setOrientation(e);
			p.width = h;
			p.height = k;
			p.viW = h;
			p.viH = k;
			p.dataProvider = c;
			p.reversed = r.reversed;
			p.logarithmic = r.logarithmic;
			p.gridAlpha = 0;
			p.axisAlpha = 0;m.push(p.set);
			e ? p.y = g : p.x = f;
			var f = Infinity,
				g = -Infinity,
				n;
			for (n = 0; n < c.length; n++) {
				var s = c[n].axes[r.id].graphs[l.id].values,
					q;
				for (q in s)
					if (s.hasOwnProperty(q) && "percents" != q && "total" != q) {
						var v = s[q];
						v < f && (f = v);v > g && (g = v)
				}
			}
			Infinity != f && (p.minimum = f);-Infinity != g && (p.maximum = g + 0.1 * (g - f));f == g && (p.minimum -= 1, p.maximum += 1);void 0 !== a.minimum && (p.minimum = a.minimum);void 0 !== a.maximum && (p.maximum = a.maximum);p.zoom(0, c.length - 1);
			q = a.unselectedGraph;
			q.id = l.id;
			q.rotate = e;
			q.chart = b;
			q.chartType = b.chartType;
			q.data = c;
			q.valueAxis = p;
			q.chart = l.chart;
			q.categoryAxis = a.categoryAxis;
			q.valueField = l.valueField;
			q.openField = l.openField;
			q.closeField = l.closeField;
			q.highField = l.highField;
			q.lowField = l.lowField;
			q.lineAlpha = a.graphLineAlpha;
			q.lineColor = a.graphLineColor;
			q.fillAlphas = a.graphFillAlpha;
			q.fillColors = a.graphFillColor;
			q.connect = l.connect;
			q.hidden = l.hidden;
			q.width = h;
			q.height = k;
			r = a.selectedGraph;
			r.id = l.id;
			r.rotate = e;
			r.chart = b;
			r.chartType = b.chartType;
			r.data = c;
			r.valueAxis = p;
			r.chart = l.chart;
			r.categoryAxis = d;
			r.valueField = l.valueField;
			r.openField = l.openField;
			r.closeField = l.closeField;
			r.highField = l.highField;
			r.lowField = l.lowField;
			r.lineAlpha = a.selectedGraphLineAlpha;
			r.lineColor = a.selectedGraphLineColor;
			r.fillAlphas = a.selectedGraphFillAlpha;
			r.fillColors = a.selectedGraphFillColor;
			r.connect = l.connect;
			r.hidden = l.hidden;
			r.width = h;
			r.height = k;
			b = a.graphType;b || (b = l.type);
			q.type = b;
			r.type = b;
			c = c.length - 1;q.zoom(0, c);r.zoom(0, c);r.set.click(function() {
				a.handleBackgroundClick()
			}).mouseover(function() {
				a.handleMouseOver()
			}).mouseout(function() {
				a.handleMouseOut()
			});q.set.click(function() {
				a.handleBackgroundClick()
			}).mouseover(function() {
				a.handleMouseOver()
			}).mouseout(function() {
				a.handleMouseOut()
			});m.push(q.set);m.push(r.set)
		}
		m.push(d.set);m.push(d.labelsSet);a.bg.toBack();a.invisibleBg.toFront();a.dragger.toFront();a.iconLeft.toFront();a.iconRight.toFront()
	},
	timeZoom : function(a, b) {
		this.startTime = a;
		this.endTime = b;
		this.timeDifference = b - a;
		this.skipEvent = !0;this.zoomScrollbar()
	},
	zoom : function(a, b) {
		this.start = a;
		this.end = b;
		this.skipEvent = !0;this.zoomScrollbar()
	},
	dispatchScrollbarEvent : function() {
		if (this.skipEvent)
			this.skipEvent = !1;else {
			var a = this.chart.chartData,
				b,
				c,
				d = this.dragger.getBBox();
			b = d.x;
			c = d.y;
			var e = d.width,
				f = d.height,
				d = this.chart;
			this.rotate ? (b = c, c = f) : c = e;
			e = {
				type : "zoomed",
				target : this
			};
			e.chart = d;
			var f = this.categoryAxis,
				g = this.stepWidth;
			if (f.parseDates && !f.equalSpacing) {
				if (a = d.firstTime, f.minDuration(), d = Math.round(b / g) + a, a = this.dragging ? d + this.timeDifference : Math.round((b + c) / g) + a, d > a && (d = a), d != this.startTime || a != this.endTime) this.startTime = d, this.endTime = a, e.start = d, e.end = a, e.startDate = new Date(d), e.endDate = new Date(a), this.fire(e.type, e)
			} else if (f.startOnAxis || (b += g / 2), c -= this.stepWidth / 2, d = f.xToIndex(b), b = f.xToIndex(b + c), d != this.start || this.end != b) f.startOnAxis && (this.resizingRight && d == b && b++, this.resizingLeft && d == b && (0 < d ? d-- : b = 1)), this.start = d, this.end = this.dragging ? this.start + this.difference : b, e.start = this.start, e.end = this.end, f.parseDates && (a[this.start] && (e.startDate = new Date(a[this.start].time)), a[this.end] && (e.endDate = new Date(a[this.end].time))), this.fire(e.type, e)
		}
	},
	zoomScrollbar : function() {
		var a,
			b;
		a = this.chart;
		var c = a.chartData,
			d = this.categoryAxis;
		d.parseDates && !d.equalSpacing ? (c = d.stepWidth, d = a.firstTime, a = c * (this.startTime - d), b = c * (this.endTime - d)) : (a = c[this.start].x[d.id], b = c[this.end].x[d.id], c = d.stepWidth, d.startOnAxis || (d = c / 2, a -= d, b += d));
		this.stepWidth = c;this.updateScrollbarSize(a, b)
	},
	maskGraphs : function(a, b, c, d) {
		var e = this.selectedGraph;
		e && e.set.clipRect(a, b, c, d)
	},
	handleDragStart : function() {
		AmCharts.ChartScrollbar.base.handleDragStart.call(this);
		this.difference = this.end - this.start;
		this.timeDifference = this.endTime - this.startTime;0 > this.timeDifference && (this.timeDifference = 0)
	},
	handleBackgroundClick : function() {
		AmCharts.ChartScrollbar.base.handleBackgroundClick.call(this);this.dragging || (this.difference = this.end - this.start, this.timeDifference = this.endTime - this.startTime, 0 > this.timeDifference && (this.timeDifference = 0))
	}
});
AmCharts.circle = function(a, b, c, d, e, f, g, h) {
	if (void 0 == e || 0 === e)
		e = 1;
	void 0 === f && (f = "#000000");void 0 === g && (g = 0);
	d = {
		fill : c,
		stroke : f,
		"fill-opacity" : d,
		"stroke-width" : e,
		"stroke-opacity" : g
	};
	a = a.circle(0, 0, b).attr(d);h && a.gradient("radialGradient", [ c, AmCharts.adjustLuminosity(c, -0.6) ]);return a
};
AmCharts.text = function(a, b, c, d, e, f, g, h) {
	f || (f = "middle");"right" == f && (f = "end");AmCharts.isIE && 9 > AmCharts.IEversion && (b = b.replace("&amp;", "&"), b = b.replace("&", "&amp;"));
	c = {
		fill : c,
		"font-family" : d,
		"font-size" : e,
		opacity : h
	};!0 === g && (c["font-weight"] = "bold");
	c["text-anchor"] = f;return a.text(b, c)
};
AmCharts.polygon = function(a, b, c, d, e, f, g, h, k) {
	isNaN(f) && (f = 0);isNaN(h) && (h = e);
	var l = d,
		m = !1;
	"object" == typeof l && 1 < l.length && (m = !0, l = l[0]);void 0 === g && (g = l);
	e = {
		fill : l,
		stroke : g,
		"fill-opacity" : e,
		"stroke-width" : f,
		"stroke-opacity" : h
	};
	f = AmCharts.dx;
	g = AmCharts.dy;
	h = Math.round;
	var l = "M" + (h(b[0]) + f) + "," + (h(c[0]) + g),
		p;
	for (p = 1; p < b.length; p++) l += " L" + (h(b[p]) + f) + "," + (h(c[p]) + g);
	a = a.path(l + " Z").attr(e);m && a.gradient("linearGradient", d, k);return a
};
AmCharts.rect = function(a, b, c, d, e, f, g, h, k, l) {
	isNaN(f) && (f = 0);void 0 === k && (k = 0);void 0 === l && (l = 270);isNaN(e) && (e = 0);
	var m = d,
		p = !1;
	"object" == typeof m && (m = m[0], p = !0);void 0 === g && (g = m);void 0 === h && (h = e);
	b = Math.round(b);
	c = Math.round(c);
	var r = 0,
		n = 0;
	0 > b && (b = Math.abs(b), r = -b);0 > c && (c = Math.abs(c), n = -c);
	r += AmCharts.dx;
	n += AmCharts.dy;
	e = {
		fill : m,
		stroke : g,
		"fill-opacity" : e,
		"stroke-opacity" : h
	};
	a = a.rect(r, n, b, c, k, f).attr(e);p && a.gradient("linearGradient", d, l);return a
};
AmCharts.triangle = function(a, b, c, d, e, f, g, h) {
	if (void 0 === f || 0 === f)
		f = 1;
	void 0 === g && (g = "#000");void 0 === h && (h = 0);
	d = {
		fill : d,
		stroke : g,
		"fill-opacity" : e,
		"stroke-width" : f,
		"stroke-opacity" : h
	};
	b /= 2;
	var k;
	0 === c && (k = " M" + -b + "," + b + " L0," + -b + " L" + b + "," + b + " Z");180 == c && (k = " M" + -b + "," + -b + " L0," + b + " L" + b + "," + -b + " Z");90 == c && (k = " M" + -b + "," + -b + " L" + b + ",0 L" + -b + "," + b + " Z");270 == c && (k = " M" + -b + ",0 L" + b + "," + b + " L" + b + "," + -b + " Z");return a.path(k).attr(d)
};
AmCharts.line = function(a, b, c, d, e, f, g, h, k, l) {
	f = {
		fill : "none",
		"stroke-width" : f
	};void 0 !== g && 0 < g && (f["stroke-dasharray"] = g);isNaN(e) || (f["stroke-opacity"] = e);d && (f.stroke = d);
	d = Math.round;l && (d = AmCharts.doNothing);
	l = AmCharts.dx;
	e = AmCharts.dy;
	g = "M" + (d(b[0]) + l) + "," + (d(c[0]) + e);
	for (h = 1; h < b.length; h++) g += " L" + (d(b[h]) + l) + "," + (d(c[h]) + e);
	if (AmCharts.VML) return a.path(g, void 0, !0).attr(f);
	k && (g += " M0,0 L0,0");return a.path(g).attr(f)
};
AmCharts.doNothing = function(a) {
	return a
};
AmCharts.wedge = function(a, b, c, d, e, f, g, h, k, l, m) {
	var p = Math.round;
	f = p(f);
	g = p(g);
	h = p(h);
	var r = p(g / f * h),
		n = AmCharts.VML,
		s = -359.5 - f / 100;
	-359.94 > s && (s = -359.94);e <= s && (e = s);
	var q = 1 / 180 * Math.PI,
		s = b + Math.cos(d * q) * h,
		v = c + Math.sin(-d * q) * r,
		u = b + Math.cos(d * q) * f,
		t = c + Math.sin(-d * q) * g,
		w = b + Math.cos((d + e) * q) * f,
		y = c + Math.sin((-d - e) * q) * g,
		x = b + Math.cos((d + e) * q) * h,
		q = c + Math.sin((-d - e) * q) * r,
		A = {
			fill : AmCharts.adjustLuminosity(l.fill, -0.2),
			"stroke-opacity" : 0
		},
		z = 0;
	180 < Math.abs(e) && (z = 1);
	d = a.set();
	var H;
	n && (s = p(10 * s), u = p(10 * u), w = p(10 * w), x = p(10 * x), v = p(10 * v), t = p(10 * t), y = p(10 * y), q = p(10 * q), b = p(10 * b), k = p(10 * k), c = p(10 * c), f *= 10, g *= 10, h *= 10, r *= 10, 1 > Math.abs(e) && 1 >= Math.abs(w - u) && 1 >= Math.abs(y - t) && (H = !0));
	e = "";
	if (0 < k) {
		n ? (path = " M" + s + "," + (v + k) + " L" + u + "," + (t + k), H || (path += " A" + (b - f) + "," + (k + c - g) + "," + (b + f) + "," + (k + c + g) + "," + u + "," + (t + k) + "," + w + "," + (y + k)), path += " L" + x + "," + (q + k), 0 < h && (H || (path += " B" + (b - h) + "," + (k + c - r) + "," + (b + h) + "," + (k + c + r) + "," + x + "," + (k + q) + "," + s + "," + (k + v)))) : (path = " M" + s + "," + (v + k) + " L" + u + "," + (t + k), path += " A" + f + "," + g + ",0," + z + ",1," +
			w + "," + (y + k) + " L" + x + "," + (q + k), 0 < h && (path += " A" + h + "," + r + ",0," + z + ",0," + s + "," + (v + k)));
		path += " Z";
		var E = a.path(path, void 0, void 0, "1000,1000").attr(A);
		d.push(E);
		E = a.path(" M" + s + "," + v + " L" + s + "," + (v + k) + " L" + u + "," + (t + k) + " L" + u + "," + t + " L" + s + "," + v + " Z", void 0, void 0, "1000,1000").attr(A);
		k = a.path(" M" + w + "," + y + " L" + w + "," + (y + k) + " L" + x + "," + (q + k) + " L" + x + "," + q + " L" + w + "," + y + " Z", void 0, void 0, "1000,1000").attr(A);d.push(E);d.push(k)
	}
	n ? (H || (e = " A" + p(b - f) + "," + p(c - g) + "," + p(b + f) + "," + p(c + g) + "," + p(u) + "," + p(t) + "," + p(w) +
	"," + p(y)), f = " M" + p(s) + "," + p(v) + " L" + p(u) + "," + p(t) + e + " L" + p(x) + "," + p(q)) : f = " M" + s + "," + v + " L" + u + "," + t + (" A" + f + "," + g + ",0," + z + ",1," + w + "," + y) + " L" + x + "," + q;0 < h && (n ? H || (f += " B" + (b - h) + "," + (c - r) + "," + (b + h) + "," + (c + r) + "," + x + "," + q + "," + s + "," + v) : f += " A" + h + "," + r + ",0," + z + ",0," + s + "," + v);
	a = a.path(f + " Z", void 0, void 0, "1000,1000").attr(l);
	if (m) {
		b = [];
		for (c = 0; c < m.length; c++) b.push(AmCharts.adjustLuminosity(l.fill, m[c]));
		0 < b.length && a.gradient("linearGradient", b)
	}
	d.push(a);return d
};
AmCharts.adjustLuminosity = function(a, b) {
	a = String(a).replace(/[^0-9a-f]/gi, "");6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2]));
	b = b || 0;
	var c = "#",
		d,
		e;
	for (e = 0; 3 > e; e++) d = parseInt(a.substr(2 * e, 2), 16), d = Math.round(Math.min(Math.max(0, d + d * b), 255)).toString(16), c += ("00" + d).substr(d.length);
	return c
};
AmCharts.AmPieChart = AmCharts.Class({
	inherits : AmCharts.AmChart,
	construct : function() {
		this.createEvents("rollOverSlice", "rollOutSlice", "clickSlice", "pullOutSlice", "pullInSlice", "rightClickSlice");AmCharts.AmPieChart.base.construct.call(this);
		this.colors = "#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");
		this.pieAlpha = 1;
		this.pieBrightnessStep = 30;
		this.groupPercent = 0;
		this.groupedTitle = "Other";
		this.groupedPulled = !1;
		this.groupedAlpha = 1;
		this.marginLeft = 0;
		this.marginBottom = this.marginTop = 10;
		this.marginRight = 0;
		this.minRadius = 10;
		this.hoverAlpha = 1;
		this.depth3D = 0;
		this.startAngle = 90;
		this.angle = this.innerRadius = 0;
		this.outlineColor = "#FFFFFF";
		this.outlineAlpha = 0;
		this.outlineThickness = 1;
		this.startRadius = "500%";
		this.startDuration = this.startAlpha = 1;
		this.startEffect = "bounce";
		this.sequencedAnimation = !1;
		this.pullOutRadius = "20%";
		this.pullOutDuration = 1;
		this.pullOutEffect = "bounce";
		this.pullOnHover = this.pullOutOnlyOne = !1;
		this.labelsEnabled = !0;
		this.labelRadius = 30;
		this.labelTickColor = "#000000";
		this.labelTickAlpha = 0.2;
		this.labelText = "[[title]]: [[percents]]%";
		this.hideLabelsPercent = 0;
		this.balloonText = "[[title]]: [[percents]]% ([[value]])\n[[description]]";
		this.urlTarget = "_self";
		this.previousScale = 1;
		this.autoMarginOffset = 10;
		this.gradientRatio = []
	},
	initChart : function() {
		AmCharts.AmPieChart.base.initChart.call(this);this.dataChanged && (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, this.legend && this.legend.setData(this.chartData));this.drawChart()
	},
	handleLegendEvent : function(a) {
		var b = a.type;
		if (a = a.dataItem) {
			var c = a.hidden;
			switch (b) {
			case "clickMarker":
				c || this.clickSlice(a);
				break;case "clickLabel":
				c || this.clickSlice(a);
				break;case "rollOverItem":
				c || this.rollOverSlice(a, !1);
				break;case "rollOutItem":
				c || this.rollOutSlice(a);
				break;case "hideItem":
				this.hideSlice(a);
				break;case "showItem":
				this.showSlice(a)
			}
		}
	},
	invalidateVisibility : function() {
		this.recalculatePercents();this.initChart();
		var a = this.legend;
		a && a.invalidateSize()
	},
	drawChart : function() {
		var a = this;
		AmCharts.AmPieChart.base.drawChart.call(a);
		var b = a.chartData;
		if (AmCharts.ifArray(b)) {
			if (0 < a.realWidth && 0 < a.realHeight) {
				AmCharts.VML && (a.startAlpha = 1);
				var c = a.startDuration,
					d = a.container,
					e = a.updateWidth();
				a.realWidth = e;
				var f = a.updateHeight();
				a.realHeight = f;
				var g = AmCharts.toCoordinate,
					h = g(a.marginLeft, e),
					k = g(a.marginRight, e),
					l = g(a.marginTop, f) + a.getTitleHeight(),
					m = g(a.marginBottom, f);
				a.chartDataLabels = [];
				a.ticks = [];
				var p,
					r,
					n,
					s = AmCharts.toNumber(a.labelRadius),
					q = a.measureMaxLabel();
				a.labelText && a.labelsEnabled || (s = q = 0);
				p = void 0 === a.pieX ? (e - h - k) / 2 + h : g(a.pieX, a.realWidth);
				r = void 0 === a.pieY ? (f - l - m) / 2 + l : g(a.pieY, f);
				n = g(a.radius, e, f);
				a.pullOutRadiusReal = AmCharts.toCoordinate(a.pullOutRadius, n);n || (e = 0 <= s ? e - h - k - 2 * q : e - h - k, f = f - l - m, n = Math.min(e, f), f < e && (n /= 1 - a.angle / 90, n > e && (n = e)), a.pullOutRadiusReal = AmCharts.toCoordinate(a.pullOutRadius, n), n = 0 <= s ? n - 1.8 * (s + a.pullOutRadiusReal) : n - 1.8 * a.pullOutRadiusReal, n /= 2);n < a.minRadius && (n = a.minRadius);
				a.pullOutRadiusReal = g(a.pullOutRadius, n);
				g = g(a.innerRadius, n);g >= n && (g = n - 1);
				f = AmCharts.fitToBounds(a.startAngle, 0, 360);0 < a.depth3D && (f = 270 <= f ? 270 : 90);
				l = n - n * a.angle / 90;
				for (m = 0; m < b.length; m++)
					if (e = b[m], !0 !== e.hidden && 0 < e.percents) {
						var k = 360 * -e.percents / 100,
							q = Math.cos((f + k / 2) / 180 * Math.PI),
							v = Math.sin((-f - k / 2) / 180 * Math.PI) * (l / n),
							h = {
								fill : e.color,
								stroke : a.outlineColor,
								"stroke-width" : a.outlineThickness,
								"stroke-opacity" : a.outlineAlpha
							};
						e.url && (h.cursor = "pointer");
						h = AmCharts.wedge(d, p, r, f, k, n, l, g, a.depth3D, h, a.gradientRatio);a.addEventListeners(h, e);
						e.startAngle = f;
						b[m].wedge = h;
						if (0 < c) {
							var u = a.startAlpha;
							a.chartCreated && (u = e.alpha);h.setAttr("opacity", u)
						}
						e.ix = q;
						e.iy = v;
						e.wedge = h;
						e.index = m;
						if (a.labelsEnabled && a.labelText && e.percents >= a.hideLabelsPercent) {
							var t = f + k / 2;
							0 >= t && (t += 360);
							k = s;isNaN(e.labelRadius) || (k = e.labelRadius);
							var q = p + q * (n + k),
								v = r + v * (n + k),
								w,
								u = 0;
							if (0 <= k) {
								var y;
								90 >= t && 0 <= t ? (y = 0, w = "start", u = 8) : 360 >= t && 270 < t ? (y = 1, w = "start", u = 8) : 270 >= t && 180 < t ? (y = 2, w = "end", u = -8) : 180 >= t && 90 < t && (y = 3, w = "end", u = -8);
								e.labelQuarter = y
							} else
								w = "middle";
							var t = a.formatString(a.labelText, e),
								x = e.labelColor;
							void 0 === x && (x = a.color);
							t = AmCharts.text(d, t, x, a.fontFamily, a.fontSize, w);t.translate(q + 1.5 * u, v);
							e.tx = q + 1.5 * u;
							e.ty = v;
							0 <= k ? h.push(t) : a.freeLabelsSet.push(t);
							e.label = t;
							a.chartDataLabels[m] = t;
							e.tx = q;
							e.tx2 = q + u
						}
						a.graphsSet.push(h);(0 === e.alpha || 0 < c && !a.chartCreated) && h.hide();
						f -= 360 * e.percents / 100;0 >= f && (f += 360)
				}
				b = setTimeout(function() {
					a.showLabels.call(a)
				}, 1E3 * c);a.timeOuts.push(b);0 < s && !a.labelRadiusField && a.arrangeLabels();
				a.pieXReal = p;
				a.pieYReal = r;
				a.radiusReal = n;
				a.innerRadiusReal = g;0 < s && a.drawTicks();
				a.chartCreated ? a.pullSlices(!0) : (c = setTimeout(function() {
					a.pullSlices.call(a)
				}, 1200 * c), a.timeOuts.push(c));a.chartCreated || a.startSlices();a.setDepths()
			}
			(c = a.legend) && c.invalidateSize()
		} else a.cleanChart();
		a.dispDUpd();
		a.chartCreated = !0
	},
	setDepths : function() {
		var a = this.chartData,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b],
				d = c.wedge,
				c = c.startAngle;
			90 >= c && 0 <= c || 360 >= c && 270 < c ? d.toFront() : (270 >= c && 180 < c || 180 >= c && 90 < c) && d.toBack()
		}
	},
	addEventListeners : function(a, b) {
		var c = this;
		a.mouseover(function() {
			c.rollOverSlice(b, !0)
		}).mouseout(function() {
			c.rollOutSlice(b)
		}).click(function() {
			c.clickSlice(b)
		}).contextmenu(function() {
			c.handleRightClick(b)
		})
	},
	formatString : function(a, b) {
		a = AmCharts.formatValue(a, b, [ "value" ], this.numberFormatter, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
		a = AmCharts.formatValue(a, b, [ "percents" ], this.percentFormatter);
		a = AmCharts.massReplace(a, {
			"[[title]]" : b.title,
			"[[description]]" : b.description,
			"<br>" : "\n"
		});-1 != a.indexOf("[[") && (a = AmCharts.formatDataContextValue(a, b.dataContext));
		a = AmCharts.fixNewLines(a);return a = AmCharts.cleanFromEmpty(a)
	},
	drawTicks : function() {
		var a = this.chartData,
			b;
		for (b = 0; b < a.length; b++)
			if (this.chartDataLabels[b]) {
				var c = a[b],
					d = c.ty,
					e = this.radiusReal,
					d = AmCharts.line(this.container, [ this.pieXReal + c.ix * e, c.tx, c.tx2 ], [ this.pieYReal + c.iy * e, d, d ], this.labelTickColor, this.labelTickAlpha);
				c.wedge.push(d);
				this.ticks[b] = d
		}
	},
	arrangeLabels : function() {
		var a = this.chartData,
			b = a.length,
			c,
			d;
		for (d = b - 1; 0 <= d; d--) c = a[d], 0 !== c.labelQuarter || c.hidden || this.checkOverlapping(d, c, 0, !0, 0);
		for (d = 0; d < b; d++) c = a[d], 1 != c.labelQuarter || c.hidden || this.checkOverlapping(d, c, 1, !1, 0);
		for (d = b - 1; 0 <= d; d--) c = a[d], 2 != c.labelQuarter || c.hidden || this.checkOverlapping(d, c, 2, !0, 0);
		for (d = 0; d < b; d++) c = a[d], 3 != c.labelQuarter || c.hidden || this.checkOverlapping(d, c, 3, !1, 0)
	},
	checkOverlapping : function(a, b, c, d, e) {
		var f,
			g,
			h = this.chartData,
			k = h.length,
			l = b.label;
		if (l) {
			if (!0 === d)
				for (g = a + 1; g < k; g++) (f = this.checkOverlappingReal(b, h[g], c)) && (g = k);
			else
				for (g = a - 1; 0 <= g; g--) (f = this.checkOverlappingReal(b, h[g], c)) && (g = 0);
			!0 === f && 100 > e && (f = b.ty + 3 * b.iy, b.ty = f, l.translate(b.tx2, f), this.checkOverlapping(a, b, c, d, e + 1))
		}
	},
	checkOverlappingReal : function(a, b, c) {
		var d = !1,
			e = a.label,
			f = b.label;
		a.labelQuarter != c || a.hidden || b.hidden || !f || (e = e.getBBox(), c = {}, c.width = e.width, c.height = e.height, c.y = a.ty, c.x = a.tx, a = f.getBBox(), f = {}, f.width = a.width, f.height = a.height, f.y = b.ty, f.x = b.tx, AmCharts.hitTest(c, f) && (d = !0));return d
	},
	startSlices : function() {
		var a;
		for (a = 0; a < this.chartData.length; a++) 0 < this.startDuration && this.sequencedAnimation ? this.setStartTO(a) : this.startSlice(this.chartData[a])
	},
	setStartTO : function(a) {
		var b = this;
		a = setTimeout(function() {
			b.startSequenced.call(b)
		}, 500 * (b.startDuration / b.chartData.length) * a);b.timeOuts.push(a)
	},
	pullSlices : function(a) {
		var b = this.chartData,
			c;
		for (c = 0; c < b.length; c++) {
			var d = b[c];
			d.pulled && this.pullSlice(d, 1, a)
		}
	},
	startSequenced : function() {
		var a = this.chartData,
			b;
		for (b = 0; b < a.length; b++)
			if (!a[b].started) {
				this.startSlice(this.chartData[b]);break
		}
	},
	startSlice : function(a) {
		a.started = !0;
		var b = a.wedge,
			c = this.startDuration;
		if (b && 0 < c) {
			0 < a.alpha && b.show();
			var d = AmCharts.toCoordinate(this.startRadius, this.radiusReal);
			b.translate(Math.round(a.ix * d), Math.round(a.iy * d));b.animate({
				opacity : a.alpha,
				translate : "0,0"
			}, c, this.startEffect)
		}
	},
	showLabels : function() {
		var a = this.chartData,
			b;
		for (b = 0; b < a.length; b++)
			if (0 < a[b].alpha) {
				var c = this.chartDataLabels[b];
				c && c.show();(c = this.ticks[b]) && c.show()
		}
	},
	showSlice : function(a) {
		isNaN(a) ? a.hidden = !1 : this.chartData[a].hidden = !1;this.hideBalloon();this.invalidateVisibility()
	},
	hideSlice : function(a) {
		isNaN(a) ? a.hidden = !0 : this.chartData[a].hidden = !0;this.hideBalloon();this.invalidateVisibility()
	},
	rollOverSlice : function(a, b) {
		isNaN(a) || (a = this.chartData[a]);clearTimeout(this.hoverInt);this.pullOnHover && this.pullSlice(a, 1);
		var c = this.innerRadiusReal + (this.radiusReal - this.innerRadiusReal) / 2;
		a.pulled && (c += this.pullOutRadiusReal);1 > this.hoverAlpha && a.wedge && a.wedge.attr({
			opacity : this.hoverAlpha
		});
		var d = a.ix * c + this.pieXReal,
			c = a.iy * c + this.pieYReal,
			e = this.formatString(this.balloonText, a),
			f = AmCharts.adjustLuminosity(a.color, -0.15);
		this.showBalloon(e, f, b, d, c);
		d = {
			type : "rollOverSlice",
			dataItem : a,
			chart : this
		};this.fire(d.type, d)
	},
	rollOutSlice : function(a) {
		isNaN(a) || (a = this.chartData[a]);a.wedge && a.wedge.attr({
			opacity : a.alpha
		});this.hideBalloon();
		a = {
			type : "rollOutSlice",
			dataItem : a,
			chart : this
		};this.fire(a.type, a)
	},
	clickSlice : function(a) {
		isNaN(a) || (a = this.chartData[a]);this.hideBalloon();
		a.pulled ? this.pullSlice(a, 0) : this.pullSlice(a, 1);AmCharts.getURL(a.url, this.urlTarget);
		a = {
			type : "clickSlice",
			dataItem : a,
			chart : this
		};this.fire(a.type, a)
	},
	handleRightClick : function(a) {
		isNaN(a) || (a = this.chartData[a]);
		a = {
			type : "rightClickSlice",
			dataItem : a,
			chart : this
		};this.fire(a.type, a)
	},
	pullSlice : function(a, b, c) {
		var d = a.ix,
			e = a.iy,
			f = this.pullOutDuration;
		!0 === c && (f = 0);
		c = a.wedge;
		var g = this.pullOutRadiusReal;
		c && c.animate({
			translate : b * d * g + "," + b * e * g
		}, f, this.pullOutEffect);
		1 == b ? (a.pulled = !0, this.pullOutOnlyOne && this.pullInAll(a.index), a = {
			type : "pullOutSlice",
			dataItem : a,
			chart : this
		}) : (a.pulled = !1, a = {
			type : "pullInSlice",
			dataItem : a,
			chart : this
		});this.fire(a.type, a)
	},
	pullInAll : function(a) {
		var b = this.chartData,
			c;
		for (c = 0; c < this.chartData.length; c++) c != a && b[c].pulled && this.pullSlice(b[c], 0)
	},
	pullOutAll : function(a) {
		a = this.chartData;
		var b;
		for (b = 0; b < a.length; b++) a[b].pulled || this.pullSlice(a[b], 1)
	},
	parseData : function() {
		var a = [];
		this.chartData = a;
		var b = this.dataProvider;
		if (void 0 !== b) {
			var c = b.length,
				d = 0,
				e,
				f,
				g;
			for (e = 0; e < c; e++) {
				f = {};var h = b[e];
				f.dataContext = h;
				f.value = Number(h[this.valueField]);(g = h[this.titleField]) || (g = "");
				f.title = g;
				f.pulled = AmCharts.toBoolean(h[this.pulledField], !1);(g = h[this.descriptionField]) || (g = "");
				f.description = g;
				f.labelRadius = Number(h[this.labelRadiusField]);
				f.url = h[this.urlField];
				f.visibleInLegend = AmCharts.toBoolean(h[this.visibleInLegendField], !0);
				g = h[this.alphaField];
				f.alpha = void 0 !== g ? Number(g) : this.pieAlpha;
				g = h[this.colorField];void 0 !== g && (f.color = AmCharts.toColor(g));
				f.labelColor = AmCharts.toColor(h[this.labelColorField]);
				d += f.value;
				f.hidden = !1;
				a[e] = f
			}
			for (e = b = 0; e < c; e++) f = a[e], f.percents = 100 * (f.value / d), f.percents < this.groupPercent && b++;
			1 < b && (this.groupValue = 0, this.removeSmallSlices(), a.push({
				title : this.groupedTitle,
				value : this.groupValue,
				percents : 100 * (this.groupValue / d),
				pulled : this.groupedPulled,
				color : this.groupedColor,
				url : this.groupedUrl,
				description : this.groupedDescription,
				alpha : this.groupedAlpha
			}));
			for (e = 0; e < a.length; e++) this.pieBaseColor ? g = AmCharts.adjustLuminosity(this.pieBaseColor, e * this.pieBrightnessStep / 100) : (g = this.colors[e], void 0 === g && (g = AmCharts.randomColor())), void 0 === a[e].color && (a[e].color = g);
			this.recalculatePercents()
		}
	},
	recalculatePercents : function() {
		var a = this.chartData,
			b = 0,
			c,
			d;
		for (c = 0; c < a.length; c++) d = a[c], !d.hidden && 0 < d.value && (b += d.value);
		for (c = 0; c < a.length; c++) d = this.chartData[c], d.percents = !d.hidden && 0 < d.value ? 100 * d.value / b : 0
	},
	removeSmallSlices : function() {
		var a = this.chartData,
			b;
		for (b = a.length - 1; 0 <= b; b--) a[b].percents < this.groupPercent && (this.groupValue += a[b].value, a.splice(b, 1))
	},
	animateAgain : function() {
		var a = this;
		a.startSlices();
		var b = setTimeout(function() {
			a.pullSlices.call(a)
		}, 1200 * a.startDuration);
		a.timeOuts.push(b)
	},
	measureMaxLabel : function() {
		var a = this.chartData,
			b = 0,
			c;
		for (c = 0; c < a.length; c++) {
			var d = this.formatString(this.labelText, a[c]),
				d = AmCharts.text(this.container, d, this.color, this.fontFamily, this.fontSize),
				e = d.getBBox().width;
			e > b && (b = e);d.remove()
		}
		return b
	}
});
AmCharts.AmXYChart = AmCharts.Class({
	inherits : AmCharts.AmRectangularChart,
	construct : function() {
		AmCharts.AmXYChart.base.construct.call(this);this.createEvents("zoomed");
		this.maxZoomFactor = 20;
		this.chartType = "xy"
	},
	initChart : function() {
		AmCharts.AmXYChart.base.initChart.call(this);this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
		this.updateScrollbar = !0;this.drawChart();this.autoMargins && !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins());
		var a = this.marginLeftReal,
			b = this.marginTopReal,
			c = this.plotAreaWidth,
			d = this.plotAreaHeight;
		this.graphsSet.clipRect(a, b, c, d);this.bulletSet.clipRect(a, b, c, d);this.trendLinesSet.clipRect(a, b, c, d)
	},
	createValueAxes : function() {
		var a = [],
			b = [];
		this.xAxes = a;
		this.yAxes = b;
		var c = this.valueAxes,
			d,
			e;
		for (e = 0; e < c.length; e++) {
			d = c[e];var f = d.position;
			if ("top" == f || "bottom" == f)
				d.rotate = !0;
			d.setOrientation(d.rotate);
			f = d.orientation;"V" == f && b.push(d);"H" == f && a.push(d)
		}
		0 === b.length && (d = new AmCharts.ValueAxis, d.rotate = !1, d.setOrientation(!1), c.push(d), b.push(d));0 === a.length && (d = new AmCharts.ValueAxis, d.rotate = !0, d.setOrientation(!0), c.push(d), a.push(d));
		for (e = 0; e < c.length; e++) this.processValueAxis(c[e], e);
		a = this.graphs;
		for (e = 0; e < a.length; e++) this.processGraph(a[e], e)
	},
	drawChart : function() {
		AmCharts.AmXYChart.base.drawChart.call(this);
		AmCharts.ifArray(this.chartData) ? (this.chartScrollbar && this.updateScrollbars(), this.zoomChart()) : this.cleanChart();
		if (this.hideXScrollbar) {
			var a = this.scrollbarH;
			a && (this.removeListener(a, "zoomed", this.handleHSBZoom), a.destroy());
			this.scrollbarH = null
		}
		if (this.hideYScrollbar) {
			if (a = this.scrollbarV) this.removeListener(a, "zoomed", this.handleVSBZoom), a.destroy();
			this.scrollbarV = null
		}
		if (!this.autoMargins || this.marginsUpdated) this.dispDUpd(), this.chartCreated = !0, this.zoomScrollbars()
	},
	cleanChart : function() {
		AmCharts.callMethod("destroy", [ this.valueAxes, this.graphs, this.scrollbarV, this.scrollbarH, this.chartCursor ])
	},
	zoomChart : function() {
		this.toggleZoomOutButton();this.zoomObjects(this.valueAxes);this.zoomObjects(this.graphs);this.zoomTrendLines();this.dispatchAxisZoom()
	},
	toggleZoomOutButton : function() {
		1 == this.heightMultiplier && 1 == this.widthMultiplier ? this.showZB(!1) : this.showZB(!0)
	},
	dispatchAxisZoom : function() {
		var a = this.valueAxes,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			if (!isNaN(c.min) && !isNaN(c.max)) {
				var d,
					e;
				"V" == c.orientation ? (d = c.coordinateToValue(-this.verticalPosition), e = c.coordinateToValue(-this.verticalPosition + this.plotAreaHeight)) : (d = c.coordinateToValue(-this.horizontalPosition), e = c.coordinateToValue(-this.horizontalPosition +
					this.plotAreaWidth));
				if (!isNaN(d) && !isNaN(e)) {
					if (d > e) {
						var f = e;
						e = d;
						d = f
					}
					c.dispatchZoomEvent(d, e)
				}
			}
		}
	},
	zoomObjects : function(a) {
		var b = a.length,
			c;
		for (c = 0; c < b; c++) {
			var d = a[c];
			this.updateObjectSize(d);d.zoom(0, this.chartData.length - 1)
		}
	},
	updateData : function() {
		this.parseData();
		var a = this.chartData,
			b = a.length - 1,
			c = this.graphs,
			d = this.dataProvider,
			e = 0,
			f,
			g;
		for (f = 0; f < c.length; f++)
			if (g = c[f], g.data = a, g.zoom(0, b), g = g.valueField) {
				var h;
				for (h = 0; h < d.length; h++) {
					var k = d[h][g];
					k > e && (e = k)
				}
		}
		for (f = 0; f < c.length; f++) g = c[f], g.maxValue = e;
		if (a = this.chartCursor) a.updateData(), a.type = "crosshair", a.valueBalloonsEnabled = !1
	},
	zoomOut : function() {
		this.verticalPosition = this.horizontalPosition = 0;
		this.heightMultiplier = this.widthMultiplier = 1;this.zoomChart();this.zoomScrollbars()
	},
	processValueAxis : function(a) {
		a.chart = this;
		a.minMaxField = "H" == a.orientation ? "x" : "y";
		a.minTemp = NaN;
		a.maxTemp = NaN;this.listenTo(a, "axisSelfZoomed", this.handleAxisSelfZoom)
	},
	processGraph : function(a) {
		a.xAxis || (a.xAxis = this.xAxes[0]);a.yAxis || (a.yAxis = this.yAxes[0])
	},
	parseData : function() {
		AmCharts.AmXYChart.base.parseData.call(this);
		this.chartData = [];
		var a = this.dataProvider,
			b = this.valueAxes,
			c = this.graphs,
			d;
		for (d = 0; d < a.length; d++) {
			var e = {
					axes : {},
					x : {},
					y : {}
				},
				f = a[d],
				g;
			for (g = 0; g < b.length; g++) {
				var h = b[g].id;
				e.axes[h] = {};
				e.axes[h].graphs = {};var k;
				for (k = 0; k < c.length; k++) {
					var l = c[k],
						m = l.id;
					if (l.xAxis.id == h || l.yAxis.id == h) {
						var p = {};
						p.serialDataItem = e;
						p.index = d;
						var r = {},
							n = Number(f[l.valueField]);
						isNaN(n) || (r.value = n);
						n = Number(f[l.xField]);isNaN(n) || (r.x = n);
						n = Number(f[l.yField]);isNaN(n) || (r.y = n);
						p.values = r;this.processFields(l, p, f);
						p.serialDataItem = e;
						p.graph = l;
						e.axes[h].graphs[m] = p
					}
				}
			}
			this.chartData[d] = e
		}
	},
	formatString : function(a, b) {
		var c = b.graph.numberFormatter;
		c || (c = this.numberFormatter);
		a = AmCharts.formatValue(a, b.values, [ "value", "x", "y" ], c);-1 != a.indexOf("[[") && (a = AmCharts.formatDataContextValue(a, b.dataContext));return a = AmCharts.AmSerialChart.base.formatString.call(this, a, b)
	},
	addChartScrollbar : function(a) {
		AmCharts.callMethod("destroy", [ this.chartScrollbar, this.scrollbarH, this.scrollbarV ]);
		if (a) {
			this.chartScrollbar = a;
			this.scrollbarHeight = a.scrollbarHeight;
			var b = "backgroundColor backgroundAlpha selectedBackgroundColor selectedBackgroundAlpha scrollDuration resizeEnabled hideResizeGrips scrollbarHeight updateOnReleaseOnly".split(" ");
			if (!this.hideYScrollbar) {
				var c = new AmCharts.SimpleChartScrollbar;
				c.skipEvent = !0;
				c.chart = this;this.listenTo(c, "zoomed", this.handleVSBZoom);AmCharts.copyProperties(a, c, b);
				c.rotate = !0;
				this.scrollbarV = c
			}
			this.hideXScrollbar || (c = new AmCharts.SimpleChartScrollbar, c.skipEvent = !0, c.chart = this, this.listenTo(c, "zoomed", this.handleHSBZoom), AmCharts.copyProperties(a, c, b), c.rotate = !1, this.scrollbarH = c)
		}
	},
	updateTrendLines : function() {
		var a = this.trendLines,
			b;
		for (b = 0; b < a.length; b++) {
			var c = a[b];
			c.chart = this;c.valueAxis || (c.valueAxis = this.yAxes[0]);c.valueAxisX || (c.valueAxisX = this.xAxes[0])
		}
	},
	updateMargins : function() {
		AmCharts.AmXYChart.base.updateMargins.call(this);
		var a = this.scrollbarV;
		a && (this.getScrollbarPosition(a, !0, this.yAxes[0].position), this.adjustMargins(a, !0));
		if (a = this.scrollbarH) this.getScrollbarPosition(a, !1, this.xAxes[0].position), this.adjustMargins(a, !1)
	},
	updateScrollbars : function() {
		var a = this.scrollbarV;
		a && (this.updateChartScrollbar(a, !0), a.draw());
		if (a = this.scrollbarH) this.updateChartScrollbar(a, !1), a.draw()
	},
	zoomScrollbars : function() {
		var a = this.scrollbarH;
		a && a.relativeZoom(this.widthMultiplier, -this.horizontalPosition / this.widthMultiplier);(a = this.scrollbarV) && a.relativeZoom(this.heightMultiplier, -this.verticalPosition / this.heightMultiplier)
	},
	fitMultiplier : function(a) {
		a > this.maxZoomFactor && (a = this.maxZoomFactor);return a
	},
	handleHSBZoom : function(a) {
		var b = this.fitMultiplier(a.multiplier);
		a = -a.position * b;
		var c = -(this.plotAreaWidth * b - this.plotAreaWidth);
		a < c && (a = c);
		this.widthMultiplier = b;
		this.horizontalPosition = a;this.zoomChart()
	},
	handleVSBZoom : function(a) {
		var b = this.fitMultiplier(a.multiplier);
		a = -a.position * b;
		var c = -(this.plotAreaHeight * b - this.plotAreaHeight);
		a < c && (a = c);
		this.heightMultiplier = b;
		this.verticalPosition = a;this.zoomChart()
	},
	handleAxisSelfZoom : function(a) {
		if ("H" == a.valueAxis.orientation) {
			var b = this.fitMultiplier(a.multiplier);
			a = -a.position * b;
			var c = -(this.plotAreaWidth * b - this.plotAreaWidth);
			a < c && (a = c);
			this.horizontalPosition = a;
			this.widthMultiplier = b
		} else b = this.fitMultiplier(a.multiplier), a = -a.position * b, c = -(this.plotAreaHeight * b - this.plotAreaHeight), a < c && (a = c), this.verticalPosition = a, this.heightMultiplier = b;
		this.zoomChart();this.zoomScrollbars()
	},
	handleCursorZoom : function(a) {
		var b = this.widthMultiplier * this.plotAreaWidth / a.selectionWidth,
			c = this.heightMultiplier * this.plotAreaHeight / a.selectionHeight,
			b = this.fitMultiplier(b),
			c = this.fitMultiplier(c);
		this.horizontalPosition = (this.horizontalPosition - a.selectionX) * b / this.widthMultiplier;
		this.verticalPosition = (this.verticalPosition - a.selectionY) * c / this.heightMultiplier;
		this.widthMultiplier = b;
		this.heightMultiplier = c;this.zoomChart();this.zoomScrollbars()
	},
	removeChartScrollbar : function() {
		AmCharts.callMethod("destroy", [ this.scrollbarH, this.scrollbarV ]);
		this.scrollbarV = this.scrollbarH = null
	},
	handleReleaseOutside : function(a) {
		AmCharts.AmXYChart.base.handleReleaseOutside.call(this, a);AmCharts.callMethod("handleReleaseOutside", [ this.scrollbarH, this.scrollbarV ])
	}
});
AmCharts.AmDraw = AmCharts.Class({
	construct : function(a, b, c) {
		AmCharts.SVG_NS = "http://www.w3.org/2000/svg";
		AmCharts.SVG_XLINK = "http://www.w3.org/1999/xlink";
		AmCharts.hasSVG = !!document.createElementNS && !!document.createElementNS(AmCharts.SVG_NS, "svg").createSVGRect;1 > b && (b = 10);1 > c && (c = 10);
		this.div = a;
		this.width = b;
		this.height = c;
		this.rBin = document.createElement("div");
		if (AmCharts.hasSVG) {
			AmCharts.SVG = !0;
			var d = this.createSvgElement("svg");
			d.style.position = "absolute";
			d.style.width = b + "px";
			d.style.height = c + "px";AmCharts.rtl && (d.setAttribute("direction", "rtl"), d.style.left = "auto", d.style.right = "0px");d.setAttribute("version", "1.1");a.appendChild(d);
			this.container = d;
			this.R = new AmCharts.SVGRenderer(this)
		} else AmCharts.isIE && AmCharts.VMLRenderer && (AmCharts.VML = !0, AmCharts.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), b = document.createStyleSheet(), b.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), AmCharts.vmlStyleSheet = b), this.container = a, this.R = new AmCharts.VMLRenderer(this), this.R.disableSelection(a))
	},
	createSvgElement : function(a) {
		return document.createElementNS(AmCharts.SVG_NS, a)
	},
	circle : function(a, b, c, d) {
		var e = new AmCharts.AmDObject("circle", this);
		e.attr({
			r : c,
			cx : a,
			cy : b
		});this.addToContainer(e.node, d);return e
	},
	setSize : function(a, b) {
		0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px")
	},
	rect : function(a, b, c, d, e, f, g) {
		var h = new AmCharts.AmDObject("rect", this);
		AmCharts.VML && (e = 100 * e / Math.min(c, d), c += 2 * f, d += 2 * f, h.bw = f, h.node.style.marginLeft = -f, h.node.style.marginTop = -f);1 > c && (c = 1);1 > d && (d = 1);h.attr({
			x : a,
			y : b,
			width : c,
			height : d,
			rx : e,
			ry : e,
			"stroke-width" : f
		});this.addToContainer(h.node, g);return h
	},
	image : function(a, b, c, d, e, f) {
		var g = new AmCharts.AmDObject("image", this);
		g.attr({
			x : b,
			y : c,
			width : d,
			height : e
		});this.R.path(g, a);this.addToContainer(g.node, f);return g
	},
	addToContainer : function(a, b) {
		b || (b = this.container);b.appendChild(a)
	},
	text : function(a, b, c) {
		return this.R.text(a, b, c)
	},
	path : function(a, b, c, d) {
		var e = new AmCharts.AmDObject("path", this);
		d || (d = "100,100");e.attr({
			cs : d
		});
		c ? e.attr({
			dd : a
		}) : e.attr({
			d : a
		});this.addToContainer(e.node, b);return e
	},
	set : function(a) {
		return this.R.set(a)
	},
	remove : function(a) {
		if (a) {
			var b = this.rBin;
			b.appendChild(a);
			b.innerHTML = ""
		}
	},
	bounce : function(a, b, c, d, e) {
		return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + 0.75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + 0.9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + 0.984375) + c
	},
	easeInSine : function(a, b, c, d, e) {
		return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
	},
	easeOutSine : function(a, b, c, d, e) {
		return d * Math.sin(b / e * (Math.PI / 2)) + c
	},
	easeOutElastic : function(a, b, c, d, e) {
		a = 1.70158;
		var f = 0,
			g = d;
		if (0 === b) return c;
		if (1 == (b /= e)) return c + d;
		f || (f = 0.3 * e);
		g < Math.abs(d) ? (g = d, a = f / 4) : a = f / (2 * Math.PI) * Math.asin(d / g);return g * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - a) * Math.PI / f) + d + c
	},
	renderFix : function() {
		var a = this.container,
			b = a.style,
			c;
		try {
			c = a.getScreenCTM() || a.createSVGMatrix()
		} catch (d) {
			c = a.createSVGMatrix()
		}
		a = 1 - c.e % 1;
		c = 1 - c.f % 1;0.5 < a && (a -= 1);0.5 < c && (c -= 1);a && (b.left = a + "px");c && (b.top = c + "px")
	}
});
AmCharts.AmDObject = AmCharts.Class({
	construct : function(a, b) {
		this.D = b;
		this.R = b.R;
		this.node = this.R.create(this, a);
		this.y = this.x = 0;
		this.scale = 1
	},
	attr : function(a) {
		this.R.attr(this, a);return this
	},
	getAttr : function(a) {
		return this.node.getAttribute(a)
	},
	setAttr : function(a, b) {
		this.R.setAttr(this, a, b);return this
	},
	clipRect : function(a, b, c, d) {
		this.R.clipRect(this, a, b, c, d)
	},
	translate : function(a, b, c, d) {
		d || (a = Math.round(a), b = Math.round(b));this.R.move(this, a, b, c);
		this.x = a;
		this.y = b;
		this.scale = c;this.angle && this.rotate(this.angle)
	},
	rotate : function(a) {
		this.R.rotate(this, a);
		this.angle = a
	},
	animate : function(a, b, c) {
		for (var d in a)
			if (a.hasOwnProperty(d)) {
				var e = d,
					f = a[d];
				c = AmCharts.getEffect(c);this.R.animate(this, e, f, b, c)
		}
	},
	push : function(a) {
		if (a) {
			var b = this.node;
			b.appendChild(a.node);
			var c = a.clipPath;
			c && b.appendChild(c);(a = a.grad) && b.appendChild(a)
		}
	},
	text : function(a) {
		this.R.setText(this, a)
	},
	remove : function() {
		this.R.remove(this)
	},
	clear : function() {
		var a = this.node;
		if (a.hasChildNodes())
			for (; 1 <= a.childNodes.length;) a.removeChild(a.firstChild)
	},
	hide : function() {
		this.setAttr("visibility", "hidden")
	},
	show : function() {
		this.setAttr("visibility", "visible")
	},
	getBBox : function() {
		return this.R.getBBox(this)
	},
	toFront : function() {
		var a = this.node;
		if (a) {
			this.prevNextNode = a.nextSibling;
			var b = a.parentNode;
			b && b.appendChild(a)
		}
	},
	toPrevious : function() {
		var a = this.node;
		a && this.prevNextNode && (a = a.parentNode) && a.insertBefore(this.prevNextNode, null)
	},
	toBack : function() {
		var a = this.node;
		if (a) {
			this.prevNextNode = a.nextSibling;
			var b = a.parentNode;
			if (b) {
				var c = b.firstChild;
				c && b.insertBefore(a, c)
			}
		}
	},
	mouseover : function(a) {
		this.R.addListener(this, "mouseover", a);return this
	},
	mouseout : function(a) {
		this.R.addListener(this, "mouseout", a);return this
	},
	click : function(a) {
		this.R.addListener(this, "click", a);return this
	},
	dblclick : function(a) {
		this.R.addListener(this, "dblclick", a);return this
	},
	mousedown : function(a) {
		this.R.addListener(this, "mousedown", a);return this
	},
	mouseup : function(a) {
		this.R.addListener(this, "mouseup", a);return this
	},
	touchstart : function(a) {
		this.R.addListener(this, "touchstart", a);return this
	},
	touchend : function(a) {
		this.R.addListener(this, "touchend", a);return this
	},
	contextmenu : function(a) {
		this.node.addEventListener ? this.node.addEventListener("contextmenu", a, !0) : this.R.addListener(this, "contextmenu", a);return this
	},
	stop : function(a) {
		(a = this.animationX) && AmCharts.removeFromArray(this.R.animations, a);(a = this.animationY) && AmCharts.removeFromArray(this.R.animations, a)
	},
	length : function() {
		return this.node.childNodes.length
	},
	gradient : function(a, b, c) {
		this.R.gradient(this, a, b, c)
	}
});
AmCharts.VMLRenderer = AmCharts.Class({
	construct : function(a) {
		this.D = a;
		this.cNames = {
			circle : "oval",
			rect : "roundrect",
			path : "shape"
		};
		this.styleMap = {
			x : "left",
			y : "top",
			width : "width",
			height : "height",
			"font-family" : "fontFamily",
			"font-size" : "fontSize",
			visibility : "visibility"
		};
		this.animations = []
	},
	create : function(a, b) {
		var c;
		if ("group" == b) c = document.createElement("div"), a.type = "div";
		else if ("text" == b) c = document.createElement("div"), a.type = "text";
		else if ("image" == b) c = document.createElement("img"), a.type = "image";else {
			a.type = "shape";
			a.shapeType = this.cNames[b];
			c = document.createElement("amvml:" + this.cNames[b]);
			var d = document.createElement("amvml:stroke");
			c.appendChild(d);
			a.stroke = d;
			var e = document.createElement("amvml:fill");
			c.appendChild(e);
			a.fill = e;
			e.className = "amvml";
			d.className = "amvml";
			c.className = "amvml"
		}
		c.style.position = "absolute";
		c.style.top = 0;
		c.style.left = 0;return c
	},
	path : function(a, b) {
		a.node.setAttribute("src", b)
	},
	setAttr : function(a, b, c) {
		if (void 0 !== c) {
			var d;
			8 === document.documentMode && (d = !0);
			var e = a.node,
				f = a.type,
				g = e.style;
			"r" == b && (g.width = 2 * c, g.height = 2 * c);"roundrect" != a.shapeType || "width" != b && "height" != b || (c -= 1);"cursor" == b && (g.cursor = c);"cx" == b && (g.left = c - AmCharts.removePx(g.width) / 2);"cy" == b && (g.top = c - AmCharts.removePx(g.height) / 2);
			var h = this.styleMap[b];
			void 0 !== h && (g[h] = c);"text" == f && ("text-anchor" == b && (a.anchor = c, h = e.clientWidth, "end" == c && (g.marginLeft = -h + "px"), "middle" == c && (g.marginLeft = -(h / 2) + "px", g.textAlign = "center"), "start" == c && (g.marginLeft = "0px")), "fill" == b && (g.color = c), "font-weight" == b && (g.fontWeight = c));
			if (g = a.children)
				for (h = 0; h < g.length; h++) g[h].setAttr(b, c);
			if ("shape" == f) {
				"cs" == b && (e.style.width = "100px", e.style.height = "100px", e.setAttribute("coordsize", c));"d" == b && e.setAttribute("path", this.svgPathToVml(c));"dd" == b && e.setAttribute("path", c);
				f = a.stroke;
				a = a.fill;"stroke" == b && (d ? f.color = c : f.setAttribute("color", c));"stroke-width" == b && (d ? f.weight = c : f.setAttribute("weight", c));"stroke-opacity" == b && (d ? f.opacity = c : f.setAttribute("opacity", c));"stroke-dasharray" == b && (g = "solid", 0 < c && 3 > c && (g = "dot"), 3 <= c && 6 >= c && (g = "dash"), 6 < c && (g = "longdash"), d ? f.dashstyle = g : f.setAttribute("dashstyle", g));
				if ("fill-opacity" == b || "opacity" == b)
					0 === c ? d ? a.on = !1 : a.setAttribute("on", !1) : d ? a.opacity = c : a.setAttribute("opacity", c);
				"fill" == b && (d ? a.color = c : a.setAttribute("color", c));"rx" == b && (d ? e.arcSize = c + "%" : e.setAttribute("arcsize", c + "%"))
			}
		}
	},
	attr : function(a, b) {
		for (var c in b) b.hasOwnProperty(c) && this.setAttr(a, c, b[c])
	},
	text : function(a, b, c) {
		var d = new AmCharts.AmDObject("text", this.D),
			e = d.node;
		e.style.whiteSpace = "pre";
		e.innerHTML = a;this.D.addToContainer(e, c);this.attr(d, b);return d
	},
	getBBox : function(a) {
		return this.getBox(a.node)
	},
	getBox : function(a) {
		var b = a.offsetLeft,
			c = a.offsetTop,
			d = a.offsetWidth,
			e = a.offsetHeight,
			f;
		if (a.hasChildNodes()) {
			var g,
				h,
				k;
			for (k = 0; k < a.childNodes.length; k++) {
				f = this.getBox(a.childNodes[k]);var l = f.x;
				isNaN(l) || (isNaN(g) ? g = l : l < g && (g = l));var m = f.y;
				isNaN(m) || (isNaN(h) ? h = m : m < h && (h = m));
				l = f.width + l;isNaN(l) || (d = Math.max(d, l));
				f = f.height + m;isNaN(f) || (e = Math.max(e, f))
			}
			0 > g && (b += g);0 > h && (c += h)
		}
		return {
			x : b,
			y : c,
			width : d,
			height : e
		}
	},
	setText : function(a, b) {
		var c = a.node;
		c && (c.innerHTML = b);this.setAttr(a, "text-anchor", a.anchor)
	},
	addListener : function(a, b, c) {
		a.node["on" + b] = c
	},
	move : function(a, b, c) {
		var d = a.node,
			e = d.style;
		"text" == a.type && (c -= AmCharts.removePx(e.fontSize) / 2 - 1);"oval" == a.shapeType && (b -= AmCharts.removePx(e.width) / 2, c -= AmCharts.removePx(e.height) / 2);
		a = a.bw;isNaN(a) || (b -= a, c -= a);isNaN(b) || isNaN(c) || (d.style.left = b + "px", d.style.top = c + "px")
	},
	svgPathToVml : function(a) {
		var b = a.split(" ");
		a = "";
		var c,
			d = Math.round,
			e;
		for (e = 0; e < b.length; e++) {
			var f = b[e],
				g = f.substring(0, 1),
				f = f.substring(1),
				h = f.split(","),
				k = d(h[0]) + "," + d(h[1]);
			"M" == g && (a += " m " + k);"L" == g && (a += " l " + k);"Z" == g && (a += " x e");
			if ("Q" == g) {
				var l = c.length,
					m = c[l - 1],
					p = h[0],
					r = h[1],
					k = h[2],
					n = h[3];
				c = d(c[l - 2] / 3 + 2 / 3 * p);
				m = d(m / 3 + 2 / 3 * r);
				p = d(2 / 3 * p + k / 3);
				r = d(2 / 3 * r + n / 3);
				a += " c " + c + "," + m + "," + p + "," + r + "," + k + "," + n
			}
			"A" == g && (a += " wa " + f);"B" == g && (a += " at " + f);
			c = h
		}
		return a
	},
	animate : function(a, b, c, d, e) {
		var f = this,
			g = a.node;
		if ("translate" == b) {
			var h = c.split(",");
			b = h[1];
			c = g.offsetTop;
			g = {
				obj : a,
				frame : 0,
				attribute : "left",
				from : g.offsetLeft,
				to : h[0],
				time : d,
				effect : e
			};f.animations.push(g);
			d = {
				obj : a,
				frame : 0,
				attribute : "top",
				from : c,
				to : b,
				time : d,
				effect : e
			};f.animations.push(d);
			a.animationX = g;
			a.animationY = d
		}
		f.interval || (f.interval = setInterval(function() {
			f.updateAnimations.call(f)
		}, AmCharts.updateRate))
	},
	updateAnimations : function() {
		var a;
		for (a = this.animations.length - 1; 0 <= a; a--) {
			var b = this.animations[a],
				c = 1E3 * b.time / AmCharts.updateRate,
				d = b.frame + 1,
				e = b.obj,
				f = b.attribute;
			if (d <= c) {
				b.frame++;
				var g = Number(b.from),
					h = Number(b.to) - g,
					b = this.D[b.effect](0, d, g, h, c);
				0 === h ? this.animations.splice(a, 1) : e.node.style[f] = b
			} else e.node.style[f] = Number(b.to), this.animations.splice(a, 1)
		}
	},
	clipRect : function(a, b, c, d, e) {
		a = a.node;
		0 === b && 0 === c ? (a.style.width = d + "px", a.style.height = e + "px", a.style.overflow = "hidden") : a.style.clip = "rect(" + c + "px " + (b + d) + "px " + (c + e) + "px " + b + "px)"
	},
	rotate : function(a, b) {
		if (0 !== Number(b)) {
			var c = a.node,
				d = c.style,
				e = this.getBGColor(c.parentNode);
			d.backgroundColor = e;
			d.paddingLeft = 1;
			var e = b * Math.PI / 180,
				f = Math.cos(e),
				g = Math.sin(e),
				h = AmCharts.removePx(d.left),
				k = AmCharts.removePx(d.top),
				l = c.offsetWidth,
				c = c.offsetHeight,
				m = b / Math.abs(b);
			d.left = h + l / 2 - l / 2 * Math.cos(e) - m * c / 2 * Math.sin(e) + 3;
			d.top = k - m * l / 2 * Math.sin(e) + m * c / 2 * Math.sin(e);
			d.cssText = d.cssText + "; filter:progid:DXImageTransform.Microsoft.Matrix(M11='" + f + "', M12='" + -g + "', M21='" + g + "', M22='" + f + "', sizingmethod='auto expand');"
		}
	},
	getBGColor : function(a) {
		var b = "#FFFFFF";
		if (a.style) {
			var c = a.style.backgroundColor;
			"" !== c ? b = c : a.parentNode && (b = this.getBGColor(a.parentNode))
		}
		return b
	},
	set : function(a) {
		var b = new AmCharts.AmDObject("group", this.D);
		this.D.container.appendChild(b.node);
		if (a) {
			var c;
			for (c = 0; c < a.length; c++) b.push(a[c])
		}
		return b
	},
	gradient : function(a, b, c, d) {
		var e = "";
		"radialGradient" == b && (b = "gradientradial", c.reverse());"linearGradient" == b && (b = "gradient");
		var f;
		for (f = 0; f < c.length; f++) {
			var g = Math.round(100 * f / (c.length - 1)),
				e = e + (g + "% " + c[f]);
			f < c.length - 1 && (e += ",")
		}
		a = a.fill;
		90 == d ? d = 0 : 270 == d ? d = 180 : 180 == d ? d = 90 : 0 === d && (d = 270);
		8 === document.documentMode ? (a.type = b, a.angle = d) : (a.setAttribute("type", b), a.setAttribute("angle", d));e && (a.colors.value = e)
	},
	remove : function(a) {
		a.clipPath && this.D.remove(a.clipPath);this.D.remove(a.node)
	},
	disableSelection : function(a) {
		void 0 !== typeof a.onselectstart && (a.onselectstart = function() {
			return !1
		});
		a.style.cursor = "default"
	}
});
AmCharts.SVGRenderer = AmCharts.Class({
	construct : function(a) {
		this.D = a;
		this.animations = []
	},
	create : function(a, b) {
		return document.createElementNS(AmCharts.SVG_NS, b)
	},
	attr : function(a, b) {
		for (var c in b) b.hasOwnProperty(c) && this.setAttr(a, c, b[c])
	},
	setAttr : function(a, b, c) {
		void 0 !== c && a.node.setAttribute(b, c)
	},
	animate : function(a, b, c, d, e) {
		var f = this,
			g = a.node;
		"translate" == b ? (g = (g = g.getAttribute("transform")) ? String(g).substring(10, g.length - 1) : "0,0", g = g.split(", ").join(" "), g = g.split(" ").join(","), 0 === g && (g = "0,0")) : g = g.getAttribute(b);
		b = {
			obj : a,
			frame : 0,
			attribute : b,
			from : g,
			to : c,
			time : d,
			effect : e
		};f.animations.push(b);
		a.animationX = b;f.interval || (f.interval = setInterval(function() {
			f.updateAnimations.call(f)
		}, AmCharts.updateRate))
	},
	updateAnimations : function() {
		var a;
		for (a = this.animations.length - 1; 0 <= a; a--) {
			var b = this.animations[a],
				c = 1E3 * b.time / AmCharts.updateRate,
				d = b.frame + 1,
				e = b.obj,
				f = b.attribute,
				g,
				h,
				k;
			d <= c ? (b.frame++, "translate" == f ? (g = b.from.split(","), f = Number(g[0]), g = Number(g[1]), h = b.to.split(","), k = Number(h[0]), h = Number(h[1]), k = 0 === k - f ? k : Math.round(this.D[b.effect](0, d, f, k - f, c)), b = 0 === h - g ? h : Math.round(this.D[b.effect](0, d, g, h - g, c)), f = "transform", b = "translate(" + k + "," + b + ")") : (g = Number(b.from), k = Number(b.to), k -= g, b = this.D[b.effect](0, d, g, k, c), 0 === k && this.animations.splice(a, 1)), this.setAttr(e, f, b)) : ("translate" == f ? (h = b.to.split(","), k = Number(h[0]), h = Number(h[1]), e.translate(k, h)) : (k = Number(b.to), this.setAttr(e, f, k)), this.animations.splice(a, 1))
		}
	},
	getBBox : function(a) {
		if (a = a.node) try {
				return a.getBBox()
			} catch (b) {} return {
			width : 0,
			height : 0,
			x : 0,
			y : 0
		}
	},
	path : function(a, b) {
		a.node.setAttributeNS(AmCharts.SVG_XLINK, "xlink:href", b)
	},
	clipRect : function(a, b, c, d, e) {
		var f = a.node,
			g = a.clipPath;
		g && this.D.remove(g);
		var h = f.parentNode;
		h && (f = document.createElementNS(AmCharts.SVG_NS, "clipPath"), g = AmCharts.getUniqueId(), f.setAttribute("id", g), this.D.rect(b, c, d, e, 0, 0, f), h.appendChild(f), b = "#", AmCharts.baseHref && !AmCharts.isIE && (b = window.location.href + b), this.setAttr(a, "clip-path", "url(" + b + g + ")"), this.clipPathC++, a.clipPath = f)
	},
	text : function(a, b, c) {
		var d = new AmCharts.AmDObject("text", this.D);
		a = String(a).split("\n");
		var e = b["font-size"],
			f;
		for (f = 0; f < a.length; f++) {
			var g = this.create(null, "tspan");
			g.appendChild(document.createTextNode(a[f]));g.setAttribute("y", (e + 2) * f + e / 2);g.setAttribute("x", 0);d.node.appendChild(g)
		}
		d.node.setAttribute("y", e / 2);this.attr(d, b);this.D.addToContainer(d.node, c);return d
	},
	setText : function(a, b) {
		var c = a.node;
		c && (c.removeChild(c.firstChild), c.appendChild(document.createTextNode(b)))
	},
	move : function(a, b, c, d) {
		b = "translate(" +
			b + "," + c + ")";d && (b = b + " scale(" + d + ")");this.setAttr(a, "transform", b)
	},
	rotate : function(a, b) {
		var c = a.node.getAttribute("transform"),
			d = "rotate(" + b + ")";
		c && (d = c + " " + d);this.setAttr(a, "transform", d)
	},
	set : function(a) {
		var b = new AmCharts.AmDObject("g", this.D);
		this.D.container.appendChild(b.node);
		if (a) {
			var c;
			for (c = 0; c < a.length; c++) b.push(a[c])
		}
		return b
	},
	addListener : function(a, b, c) {
		a.node["on" + b] = c
	},
	gradient : function(a, b, c, d) {
		var e = a.node,
			f = a.grad;
		f && this.D.remove(f);
		b = document.createElementNS(AmCharts.SVG_NS, b);
		f = AmCharts.getUniqueId();b.setAttribute("id", f);
		if (!isNaN(d)) {
			var g = 0,
				h = 0,
				k = 0,
				l = 0;
			90 == d ? k = 100 : 270 == d ? l = 100 : 180 == d ? g = 100 : 0 === d && (h = 100);b.setAttribute("x1", g + "%");b.setAttribute("x2", h + "%");b.setAttribute("y1", k + "%");b.setAttribute("y2", l + "%")
		}
		for (d = 0; d < c.length; d++) g = document.createElementNS(AmCharts.SVG_NS, "stop"), h = 100 * d / (c.length - 1), 0 === d && (h = 0), g.setAttribute("offset", h + "%"), g.setAttribute("stop-color", c[d]), b.appendChild(g);
		e.parentNode.appendChild(b);
		c = "#";AmCharts.baseHref && !AmCharts.isIE && (c = window.location.href + c);e.setAttribute("fill", "url(" + c + f + ")");
		a.grad = b
	},
	remove : function(a) {
		a.clipPath && this.D.remove(a.clipPath);a.grad && this.D.remove(a.grad);this.D.remove(a.node)
	}
});
AmCharts.AmDSet = AmCharts.Class({
	construct : function(a) {
		this.create("g")
	},
	attr : function(a) {
		this.R.attr(this.node, a)
	},
	move : function(a, b) {
		this.R.move(this.node, a, b)
	}
});