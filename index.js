(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // lib/thermostat.js
  var require_thermostat = __commonJS({
    "lib/thermostat.js"(exports, module) {
      "use strict";
      var Thermostat2 = class {
        constructor() {
          this.temperature = 20;
          this.powerSavingModeEnabled = true;
        }
        up() {
          if (this.powerSavingModeEnabled) {
            if (this.temperature < 25) {
              this.temperature++;
            }
          } else {
            if (this.temperature < 32) {
              this.temperature++;
            }
          }
        }
        down() {
          if (this.temperature > 10) {
            this.temperature--;
          }
        }
        resetTemperature() {
          this.temperature = 20;
        }
        disablePowerSavingMode() {
          this.powerSavingModeEnabled = false;
        }
        enablePowerSavingMode() {
          this.powerSavingModeEnabled = true;
        }
        get currentEnergyUsage() {
          return this.temperature < 18 ? "low-usage" : this.temperature <= 25 ? "medium-usage" : "high-usage";
        }
      };
      module.exports = Thermostat2;
    }
  });

  // lib/app.js
  "use strict";
  var Thermostat = require_thermostat();
  var thermostat = new Thermostat();
  var updateTemperature = () => {
    document.getElementById("temperature").innerHTML = thermostat.temperature;
    document.getElementById("temperature").className = thermostat.currentEnergyUsage;
    document.getElementById("current-energy-usage").innerHTML = thermostat.currentEnergyUsage;
  };
  var updatePowerSavingModeStatus = () => {
    document.getElementById("psm-status").innerHTML = thermostat.powerSavingModeEnabled;
  };
  updateTemperature();
  updatePowerSavingModeStatus();
  document.getElementById("temperature-up").addEventListener("click", () => {
    thermostat.up();
    updateTemperature();
  });
  document.getElementById("temperature-down").addEventListener("click", () => {
    thermostat.down();
    updateTemperature();
  });
  document.getElementById("temperature-reset").addEventListener("click", () => {
    thermostat.resetTemperature();
    updateTemperature();
  });
  document.getElementById("enable-psm").addEventListener("click", () => {
    thermostat.enablePowerSavingMode();
    updatePowerSavingModeStatus();
  });
  document.getElementById("disable-psm").addEventListener("click", () => {
    thermostat.disablePowerSavingMode();
    updatePowerSavingModeStatus();
  });
})();
