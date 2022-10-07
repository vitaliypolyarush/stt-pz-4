declare const HASH: string;
declare const ENV: string;

import './scss/app.scss';
import {Calculator} from './libs/Calculator';


const calculator = new Calculator();

(<any>window).HASH = HASH;
(<any>window).ENV = ENV;
(<any>window).calculator = calculator;

console.log('HASH ' + HASH)
console.log('ENV ' + ENV)
console.log('calculator ', calculator)
