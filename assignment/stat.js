/**
 *
 * This file is supposed to contain statistics-related math functions.
 *
 * Author: Pavel Kuriscak
 * Created: 18.1.2017
 *
 */

export function normCDF(x) {
    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911

    let sign = 1
    if (x < 0)
        sign = -1
    x = Math.abs(x) / Math.sqrt(2.0)

    // A&S formula 7.1.26
    const t = 1.0 / (1.0 + p*x)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
    return 0.5*(1.0+sign*y)
}
