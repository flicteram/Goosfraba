# Goosfraba coding test
    I built the app using React, made the histogram using VISX and got the data from the API with the help of Apollo.
    The first issue I have encountered was that the data coming form the API was not structured per months, 
    the only thing I would get from there was a date object which I have converted to a date string. 
    From there I structured the date string and I was left with the number for month. 
    I added the together, month by month using reduce method making it an object containg the number of posts in each month. 
    Then I turned that object in to an array of objects because I needed to itterate through it in order to display the data on the chart. 
    Another challenging part of this test was understanding how VISX really works
    , making the histogram responsive and adding hover functionality which shows data about each month.
    
    
    Live: https://flicteram.github.io/Goosfraba/
