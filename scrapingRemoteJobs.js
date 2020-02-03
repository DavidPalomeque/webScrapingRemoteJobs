const puppeteer = require("puppeteer");
const fs = require("fs");

// node scrapingRemoteJobs.js
( async () => {

    try {

        var browser = await puppeteer.launch({ headless: false }); // browser
        var page = await browser.newPage(); // new page
        await page.goto("https://yourdreamremotejobnow.com/2020-long-list-of-remote-job-boards-for-any-professionals-in-any-industry-based-in-any-location/?fbclid=IwAR3hlX9nacKKb3BD5u7XIiKidiS-Y7PrbpgeyFUIGB7T5bLVAkd-4cjbhJE" , {waitUntil: 'load', timeout: 0}); // url
        await page.waitForSelector("#main"); // selector

        var content = await page.evaluate(() => { // main function
            var links = document.querySelectorAll(".elementor-text-editor ul li a[href]") // selected element/s
            var linksArray = [] // array to return
            for (let i = 0; i < links.length; i++) { // for each element selected
                var linksText = links[i].innerText.trim()
                var linksUrl = links[i].getAttribute("href")
                linksArray.push(linksText + " : " + linksUrl + "\n")
            }
            // then return
            return linksArray.join("")
        })

        await browser.close(); // close browser
        fs.writeFile("remoteJobs.txt" , content , function (err) { // write txt file
            if (err) throw err
            console.log("Done !");
        })

    } catch (err) { // if there is some error

        console.log(err); // show me the error
        await browser.close();
        console.log("Browser Closed...")

    }

})();
