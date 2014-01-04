/* Transform
    applyMatrix()
    popMatrix()
    printMatrix()
    pushMatrix()
    resetMatrix()
    rotate()
    rotateX()
    rotateY()
    rotateZ()
    scale()
    shearX()
    shearY()
    translate()
*/

define(function (require) {

  'use strict';

  var Processing = require('core');
  var linearAlgebra = require('linearalgebra');

  Processing.prototype.applyMatrix = function(n00, n01, n02, n10, n11, n12) {
    this.curElement.context.transform(n00, n01, n02, n10, n11, n12);
    var m = this.matrices[this.matrices.length-1];
    m = linearAlgebra.pMultiplyMatrix(m, [n00, n01, n02, n10, n11, n12]);

    return this;
  };

  Processing.prototype.popMatrix = function() {
    this.curElement.context.restore();
    this.matrices.pop();

    return this;
  };

  Processing.prototype.printMatrix = function() {
    console.log(this.matrices[this.matrices.length-1]);

    return this;
  };

  Processing.prototype.pushMatrix = function() {
    this.curElement.context.save();
    this.matrices.push([1,0,0,1,0,0]);

    return this;
  };

  Processing.prototype.resetMatrix = function() {
    this.curElement.context.setTransform();
    this.matrices[this.matrices.length-1] = [1,0,0,1,0,0];

    return this;
  };

  Processing.prototype.rotate = function(r) {
    r = this.radians(r);
    this.curElement.context.rotate(r);
    var m = this.matrices[this.matrices.length-1];
    var c = Math.cos(r);
    var s = Math.sin(r);
    var m11 = m[0] * c + m[2] * s;
    var m12 = m[1] * c + m[3] * s;
    var m21 = m[0] * -s + m[2] * c;
    var m22 = m[1] * -s + m[3] * c;
    m[0] = m11;
    m[1] = m12;
    m[2] = m21;
    m[3] = m22;

    return this;
  };

  Processing.prototype.rotateX = function() {


    // return this;
  };

  Processing.prototype.rotateY = function() {


    // return this;
  };

  Processing.prototype.rotateZ = function() {


    // return this;
  };

  Processing.prototype.scale = function() {
    var x = 1.0, y = 1.0;
    if (arguments.length == 1) {
      x = y = arguments[0];
    } else {
      x = arguments[0];
      y = arguments[1];
    }
    this.curElement.context.scale(x, y);
    var m = this.matrices[this.matrices.length-1];
    m[0] *= x;
    m[1] *= x;
    m[2] *= y;
    m[3] *= y;

    return this;
  };

  Processing.prototype.shearX = function(angle) {
    this.curElement.context.transform(1, 0, tan(angle), 1, 0, 0);
    var m = this.matrices[this.matrices.length-1];
    m = linearAlgebra.pMultiplyMatrix(m, [1, 0, tan(angle), 1, 0, 0]);

    return this;
  };

  Processing.prototype.shearY = function(angle) {
    this.curElement.context.transform(1, tan(angle), 0, 1, 0, 0);
    var m = this.matrices[this.matrices.length-1];
    m = linearAlgebra.pMultiplyMatrix(m, [1, tan(angle), 0, 1, 0, 0]);

    return this;
  };

  Processing.prototype.translate = function(x, y) {
    this.curElement.context.translate(x, y);
    var m = this.matrices[this.matrices.length-1];
    m[4] += m[0] * x + m[2] * y;
    m[5] += m[1] * x + m[3] * y;

    return this;
  };

  return Processing;

});