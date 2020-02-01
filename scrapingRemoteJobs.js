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
            // variables , objects , arrays to return
            var linksArray = []
            var linksTextArray = []
            var linksUrlArray = []
            var jsonContent = {
                websites : [] , 
                urls : []
            }
            for (let i = 0; i < links.length; i++) { // for each element selected
                var linksText = links[i].innerText.trim()
                var linksUrl = links[i].getAttribute("href")
                jsonContent.websites.push(linksText)
                jsonContent.urls.push(linksUrl)
                linksArray.push(linksText + " : " + linksUrl + "\n")
                linksTextArray.push(linksText + "\n")
                linksUrlArray.push(linksUrl + "\n")
            }
            // then return ONLY ONE of these
            // return jsonContent
            // return linksArray.join("")
            // return linksTextArray.join("")
            // return linksUrlArray.join("")
        })

        await browser.close(); // close browser
        fs.writeFile("remoteJobs.txt" , /* JSON.stringify(content) */ content , function (err) { // write txt / json file
            if (err) throw err
            console.log("Done !");
        })

    } catch (err) { // if there is some error

        console.log(err); // show me the error
        await browser.close();
        console.log("Browser Closed...")

    }

})();