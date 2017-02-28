# reactTest OPT X assignment project
react, redux, webpack


Test assignment
Simple option pricer
This is a simplified part of the interface used for option pricing. These types of interfaces will be
present in all parts of the trading platform.
Option price depends on many different parameters like underlying price, strike price, volatility,
interest rate, time to expiry etc. Model used for pricing options on futures is called “Black 76” and is
enclosed in the attachment ( black76.js and stat.js ).
The goal of this simple pricer is to compute the option price when given the volatility and vice-versa.
All other parameters are assumed to be known.
The interface should contain:
- Volatility input field
- Price input field
- Submit button
How it should work:
- When user inputs volatility into the volatility field (accepts only positive numeric values,
entered in percentage points, but passed to formula as number), option price is computed
on-the-fly in the second field like this:
price = black76(‘c’, ‘price’, 102, 100, 0.005, 1.0, vola)
- However, user can also input the price into the price field (restricted to positive numerical
values). Then the volatility field should display the corresponding volatility (in percentage
points). This backward-solution is also already prepared as a function:
vola = black76imp(‘c’, price, 102, 100, 0.005, 1.0)
- Not all function calls are guaranteed to produce valid results. In case of failure, functions
return NaN. This should be somehow indicated in the interface.
- Whenever user presses the submit button and valid numbers are present in both fields, the
app should make an JSON request to the endpoint described at
http://docs.optxchapiinterview.apiary.io/ and indicate successful response. Endpoint url is
http://35.156.19.202/v1/pricer/
Requirements
● Please use following
○ ES6
○ Webpack
○ React
○ Redux
● Please write at least some tests


# RUN

## install
- npm install
- build - simple build app
- dev - run webpack ev server with watch
- dev2 - run webpack ev server with hot module reload