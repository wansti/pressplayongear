/*
 *      Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */

/*jshint unused: vars*/

(function() {
    var canvas,
        ctx,
        clockRadius,
        isAmbientMode,
        animRequest,
        animTimeout,
        colorMode;

    /**
     * Returns the current date by Tizen time API or javascript API.
     * @return {Object} The current datetime object.
     * @private
     */
    function getDate() {
        'use strict';

        var date;

        try {
            date = tizen.time.getCurrentDateTime();
        } catch (err) {
            date = new Date();
        }

        return date;
    }
    
    function getColor(color) {
    	if (colorMode === "nes") {
    		switch (color) {
    			case "bg1": return "#0058f8";
    			case "bg2": return "#0000bc";
    			case "batt0": return "#a81000";
    			case "batt1": return "#e45c10";
    			case "batt2": return "#f8b800";
    			case "batt3": return "#b8f818";
    			case "batt4": return "#00b800";
    			case "bar": return "#7c7c7c";
    			case "black": return "#000000";
    			case "white": return "#3cbcfc";
    			default: return "#fcfcfc";
    		}
    	}
    	else if (colorMode === "apple2") {
    		switch (color) {    			
    			case "bg1": return "#1bcb01";
    			case "bg2": return "#0e5940";
    			case "batt0": return "#40337f";
    			case "batt1": return "#722640";
    			case "batt2": return "#e46501";
    			case "batt3": return "#bfcc80";
    			case "batt4": return "#0e5940";
    			case "bar": return "#8080080";
    			case "black": return "#000000";
    			case "white": return "#8dd9bf";
    			default: return "#ffffff";
    		}
    	}
    	else if (colorMode === "c64") {
    		switch (color) {
    			case "bg1": return "#7869c4";
    			case "bg2": return "#40318d";
    			case "batt0": return "#883932";
    			case "batt1": return "#b86962";
    			case "batt2": return "#bfce72";
    			case "batt3": return "#55a049";
    			case "batt4": return "#94e089";
    			case "bar": return "#9f9f9f";
    			case "black": return "#000000";
    			case "white": return "#67b6bd";
    			default: return "#ffffff";
    		}
    	}
    	else if (colorMode === "gameboy") {
    		switch (color) {
    			case "bg1": return "#8bac0f";
    			case "bg2": return "#306230";
    			case "batt0": return "#306230";
    			case "batt1": return "#306230";
    			case "batt2": return "#306230";
    			case "batt3": return "#306230";
    			case "batt4": return "#306230";
    			case "bar": return "#0f380f";
    			case "black": return "#0f380f";
    			case "white": return "#9bbc0f";
    			default: return "#ffffff";
    		}
    	}
    	else if (colorMode === "atari2600") {
    		switch (color) {
    			case "bg1": return "#b4586c";
    			case "bg2": return "#700014";
    			case "batt0": return "#947020";
    			case "batt1": return "#a8843c";
    			case "batt2": return "#bc9c58";
    			case "batt3": return "#ccac70";
    			case "batt4": return "#dcc084";
    			case "bar": return "#949494";
    			case "black": return "#282828";
    			case "white": return "#d0d0d0";
    			default: return "#ffffff";
    		}
    	}
    }
    
    /**
     * Renders a needle with specific angle, radius and width.
     * @param {number} angle - The angle of the needle. (0 - 360)
     * @param {number} radius - The radius ratio of the needle. (0.0 - 1.0)
     * @param {number} width - The width of the needle.
     * @private
     */
    function renderNeedle(angle, radius, width, color) {
        'use strict';

        ctx.save();
        // Assign the center of the clock to the middle of the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.lineWidth = 20*width;
        ctx.strokeStyle = color;
        ctx.moveTo(20, 0);
        ctx.lineTo(clockRadius * radius, 0);
        ctx.stroke();
        ctx.closePath();        

        ctx.restore();
    }
    
    function renderBatteryStatus() {
    	var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
    	if (battery) {
    		ctx.save();
    		if (battery.level >= 0.0) { ctx.fillStyle = getColor("bar");   ctx.fillRect(130, 40, 100, 20); }
    		if (battery.level >= 0.1) { ctx.fillStyle = getColor("batt0"); ctx.fillRect(130, 40, 10, 20); }
    		if (battery.level >= 0.2) { ctx.fillStyle = getColor("batt0"); ctx.fillRect(140, 40, 10, 20); }
    		if (battery.level >= 0.3) { ctx.fillStyle = getColor("batt1"); ctx.fillRect(150, 40, 10, 20); }
    		if (battery.level >= 0.4) { ctx.fillStyle = getColor("batt1"); ctx.fillRect(160, 40, 10, 20); }
    		if (battery.level >= 0.5) { ctx.fillStyle = getColor("batt2"); ctx.fillRect(170, 40, 10, 20); }
    		if (battery.level >= 0.6) { ctx.fillStyle = getColor("batt2"); ctx.fillRect(180, 40, 10, 20); }
    		if (battery.level >= 0.7) { ctx.fillStyle = getColor("batt3"); ctx.fillRect(190, 40, 10, 20); }
    		if (battery.level >= 0.8) { ctx.fillStyle = getColor("batt3"); ctx.fillRect(200, 40, 10, 20); }
    		if (battery.level >= 0.9) { ctx.fillStyle = getColor("batt4"); ctx.fillRect(210, 40, 10, 20); }
    		if (battery.level >= 1.0) { ctx.fillStyle = getColor("batt4"); ctx.fillRect(220, 40, 10, 20); }
    		ctx.restore();
    	}
    }
    
    function renderBinaryDay(day) {
    	ctx.save();
    	if (day -16 >= 0) { day -= 16; ctx.fillStyle = getColor("white"); } else { ctx.fillStyle = getColor("black"); } ctx.fillRect(130,300,20,20);
    	if (day - 8 >= 0) { day -=  8; ctx.fillStyle = getColor("white"); } else { ctx.fillStyle = getColor("black"); } ctx.fillRect(150,300,20,20);
    	if (day - 4 >= 0) { day -=  4; ctx.fillStyle = getColor("white"); } else { ctx.fillStyle = getColor("black"); } ctx.fillRect(170,300,20,20);
    	if (day - 2 >= 0) { day -=  2; ctx.fillStyle = getColor("white"); } else { ctx.fillStyle = getColor("black"); } ctx.fillRect(190,300,20,20);
    	if (day - 1 >= 0) { day -=  1; ctx.fillStyle = getColor("white"); } else { ctx.fillStyle = getColor("black"); } ctx.fillRect(210,300,20,20);
    	ctx.restore();
    }
    
    function renderBGPattern()
    {
    	ctx.save();
    	ctx.fillStyle = getColor("bg2");
    	ctx.fillRect(150,80,60,10);
    	ctx.fillRect(130,90,100,10);
    	ctx.fillRect(110,100,140,10);
    	ctx.fillRect(100,110,160,20);
    	ctx.fillRect(90,130,180,20);
    	ctx.fillRect(80,150,200,60);
    	ctx.fillRect(90,210,180,20);
    	ctx.fillRect(100,230,160,20);
    	ctx.fillRect(110,250,140,10);
    	ctx.fillRect(130,260,100,10);
    	ctx.fillRect(150,270,60,10);
    	ctx.fillStyle = getColor("black");
    	ctx.fillRect(170,170,20,20);
    	ctx.restore();
    }

    /**
     * Draws the watch layout of normal mode.
     * @private
     */
    function drawNormalWatch() {
        'use strict';

        // Import the current time
        var date = getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            day = date.getDate(),
            nextMove = 1000 - date.getMilliseconds(),
            i;
       
        // Erase the previous time
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        document.getElementById("bgcolor").style.backgroundColor = getColor("bg1");
               
        renderBGPattern();
        renderBatteryStatus();
        renderBinaryDay(day);

        // Render hour needle
        renderNeedle(((hours + minutes / 60 + seconds / 3600) - 3) * Math.PI / 6, 0.55, 1, getColor("black"));
        // Render minute needle
        renderNeedle(((minutes + seconds / 60) - 15) * Math.PI / 30, 0.7, 1, getColor("black"));
        
        renderNeedle((seconds - 15) * Math.PI / 30, 0.7, 0.5, getColor("black"));
        
        animTimeout = setTimeout(function() {
            animRequest = window.requestAnimationFrame(drawNormalWatch);
        }, nextMove);
    }

    /**
     * Draws the watch layout of ambient mode.
     * @private
     */
    function drawAmbientWatch() {
        'use strict';

        // Import the current time
        var date = getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

        // Erase the previous time
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        document.getElementById("bgcolor").style.backgroundColor = "#000000";

        // Render hour needle
        renderNeedle(((hours + minutes / 60 + seconds / 3600) - 3) * Math.PI / 6, 0.55, 1, "#8bac0f");
        // Render minute needle
        renderNeedle(((minutes + seconds / 60) - 15) * Math.PI / 30, 0.75, 1, "#8bac0f");
    }

    /**
     * Activates a mode of the watch.
     * @param {string} mode - The mode of the watch to be activated.
     * @private
     */
    function activateMode(mode) {
        'use strict';

        // Stop the animation before mode changing
        if (animTimeout) {
            window.clearTimeout(animTimeout);
        }
        if (animRequest) {
            window.cancelAnimationFrame(animRequest);
        }

        switch (mode) {
            case "Ambient":
                // Normal -> Ambient
                isAmbientMode = true;
                drawAmbientWatch();

                break;
            case "Normal":
                // Ambient -> Normal
                isAmbientMode = false;
                animRequest = window.requestAnimationFrame(drawNormalWatch);

                break;
            default:
                break;
        }
    }

    /**
     * Sets default event listeners.
     * @private
     */
    function setDefaultEvents() {
        'use strict';

        // Add an eventListener for timetick
        window.addEventListener("timetick", drawAmbientWatch);

        // Add an eventListener for ambientmodechanged
        window.addEventListener("ambientmodechanged", function(e) {
            if (e.detail.ambientMode === true) {
                // Rendering ambient mode case
                activateMode("Ambient");
            } else {
                // Rendering normal case
                activateMode("Normal");
            }
        });

        // Add an event listener to update the screen immediately when the device wakes up
        document.addEventListener("visibilitychange", function() {
            if (!document.hidden) {
                if (isAmbientMode === true) {
                    // Rendering ambient mode case
                    activateMode("Ambient");
                } else {
                    // Rendering normal case
                    activateMode("Normal");
                }
            }
        });
        
        document.addEventListener("click", function() {       	
        	if (colorMode === "c64") { colorMode = "nes"; }
        	else if (colorMode === "nes") { colorMode = "apple2"; }
        	else if (colorMode === "apple2") { colorMode = "atari2600"; }
        	else if (colorMode === "atari2600") { colorMode = "gameboy"; }
        	else if (colorMode === "gameboy") { colorMode = "c64"; }
        	drawNormalWatch();
        });
    }

    /**
     * Sets default variables.
     * @private
     */
    function setDefaultVariables() {
        'use strict';

        canvas = document.querySelector("#canvas");
        ctx = canvas.getContext("2d");
        canvas.width = document.body.clientWidth;
        canvas.height = canvas.width;
        clockRadius = document.body.clientWidth / 2;
        
        colorMode = "c64";

        isAmbientMode = false;
    }

    /**
     * Initiates the application.
     * @private
     */
    function init() {
        'use strict';

        setDefaultVariables();
        setDefaultEvents();

        animRequest = window.requestAnimationFrame(drawNormalWatch);
    }

    window.onload = init;
}());