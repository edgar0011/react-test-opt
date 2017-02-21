/**
 *
 * This file contains Black76 option valuation model for pricing options on futures.
 *
 * Author: Pavel Kuriscak
 * Created: 18.1.2017
 *
 */
 
import { normCDF } from './stat'

export function black76(type, param, ulPrice, strike, rate, time, vola) {
    const errorValue = NaN

    if (vola <= 0) return NaN
    if (!(type==="c") && !(type==="p")) return NaN

    const d1 = (Math.log(ulPrice / strike) + ((vola * vola) / 2) * time) / (vola * (Math.sqrt(time)))
    const d2 = d1 - (vola * Math.sqrt(time))
    const lnd1 = Math.exp(-(d1 * d1) / 2) / Math.sqrt(2 * Math.PI)

    switch (param) {
        case "price":
            if (type == "c") {
                return Math.exp(-rate * time) * ulPrice * normCDF(d1) - Math.exp(-rate * time) * strike * normCDF(d2)
            } else {
                return Math.exp(-rate * time) * strike * normCDF(-d2) - Math.exp(-rate * time) * ulPrice * normCDF(-d1)
            }
        case "delta":
            if (type == "c") {
                return Math.exp(-rate * time) * normCDF(d1)
            } else {
                return -Math.exp(-rate * time) * normCDF(-d1)
            }
        case "theta":
            if (type == "c") {
                return (-Math.exp(-rate * time) * ulPrice * lnd1 * vola) / (2 * Math.sqrt(time)) - rate * strike * Math.exp(-rate * time) * normCDF(d2) + rate * ulPrice * Math.exp(-rate * time) * normCDF(d1)
            } else {
                return (-Math.exp(-rate * time) * ulPrice * lnd1 * vola) / (2 * Math.sqrt(time)) + rate * strike * Math.exp(-rate * time) * normCDF(-d2) - rate * ulPrice * Math.exp(-rate * time) * normCDF(-d1)
            }
        case "gamma":
            return Math.exp(-rate * time) * lnd1 / (ulPrice * vola * Math.sqrt(time))
        case "vega":
            return Math.exp(-rate * time) * ulPrice * Math.sqrt(time) * lnd1
        default:
            return errorValue
    }
}


//Upgraded to use Newton-Rhapson root finding method
export function black76imp(type, quotedPrice, ulPrice, strike, rate, time) {

    const maxErr = 1e-7
    const maxIter = 20
    const minVola = 1e-5

    let iter = 0
    let vola = 2  //Initial guess, because of function convexity we pick it very high

    const minimalPrice = black76(type,"price",ulPrice,strike,rate,time,minVola)

    if (quotedPrice < minimalPrice)
        return NaN

    let f = black76(type,"price",ulPrice,strike,rate,time,vola) - quotedPrice

    while((Math.abs(f) > maxErr) && (iter <= maxIter)) {
        const vega = black76(type,"vega",ulPrice,strike,rate,time,vola)
        if (vega === 0)
            return NaN
        vola = Math.max(vola - f/vega, minVola)
        f = black76(type,"price",ulPrice,strike,rate,time,vola) - quotedPrice
        iter++
    }

    return vola
}