addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

    var videoPath = new URL(request.url).pathname

    var videoQuery = new URL(request.url).searchParams.get('url')

   // Home Page Data and Input Box

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="It is a Zee5 Online premium streamer with all features">
    <meta name="author" content="Chittaranjan Maharana">
    <meta name="copyright" content="This Created by Chittaranjan Maharana">
    <meta name="robots" content="all" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta property="og:image" content="https://cdn.jsdelivr.net/gh/Redop1189/cdn/logos/Harry_Potter.jpg" />
    <link rel="shortcut icon" type="image/x-icon" href="https://www.zee5.com/images/ZEE5_logo.svg">
    <title>Prathamesh Pawar | ZEE5 Online Player</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Redop1189/cdn/streaming/zstyle2.css">
</head>
<body>
    <div class="container">
        <nav>
            <a href="https://www.zee5.com/" title="Visit zee5 Official site" target="_blank">
                <img src="https://cdn.jsdelivr.net/gh/Redop1189/cdn/streaming/zee5.svg" alt="Zee5 logo">
            </a>
            <div class="right-nav">
                <img src="https://cdn.jsdelivr.net/gh/Redop1189/cdn/streaming/zee5-premium.svg" alt="zee5 Premium Logo">
                <h2>ZEE5 Premium</h2>
            </div>
        </nav>
        <h1><a href="https://www.zee5.com/" title="Visit zee5 Official site" target="_blank">ZEE5</a></h1>
        <!-- <h1><span>ERROR</span></h1> -->
        <div class="error">
            <h4>Something went wrong</h4>
            <h3>Please Check Your ZEE5 URL or VIDEO ID</h3>
        </div>
        <div class="search-box">
            <form method="get"  action="/" _lpchecked="1">
            <input type="search" class="searchbar" name="url" value="" placeholder="Enter ZEE5 URL or VIDEO ID" autocomplete="off">
            <button class="button" type="submit" value="" title="Stream And Enjoy !!">Stream</button>
        </div>
        <div class="info-box">
            <h3>Watch all Premium content<small>*</small> free from Zee5 without any hassle</h3>
            <h4><small>*</small>Currently DRM & ZEEPLEX content not supported<br>Working on it</h4>
            <p>No video files are stored in this website. The website simply contains user-submitted links to publicly available video stream URLs,  which to the best of our knowledge have been intentionally made public. If any links in these playlists infringe on your rights as a copyright holder, they may be removed by sending request.</p>
            <a href="https://zee5.com">© 2021 Chittaranjan Maharana</a>
        </div>
    </div>
</body>
</html>`

    if (videoPath == "/" && videoQuery == null) {
        
        return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  })
        
    } else {
        if (videoPath == "/") {
            var videoId = videoQuery.split("/").pop()
        } else {
            var videoId = videoPath.replace("/", "")
        }

        var mainFetch = await fetch(`https://gwapi.zee5.com/content/details/${videoId}?translation=en&country=IN&version=2`, {
            headers: {
                "x-access-token": await token(),
                'Content-Type': 'application/json'
            }
        })
        var mainFetch = await mainFetch.json()


        // Error 400 Code 

        const erhtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="It is a Zee5 Online premium streamer with all features">
    <meta name="author" content="Chittaranjan Maharana">
    <meta name="copyright" content="This Created by Chittaranjan Maharana">
    <meta name="robots" content="all" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="https://www.zee5.com/images/ZEE5_logo.svg">
    <title>Prathamesh Pawar | ZEE5 Online Player</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Redop1189/cdn/streaming/zstyle2.css">
    <!-- <link rel="stylesheet" href="zstyle.css"> -->
</head>
<body>
    <div class="container">
        <nav>
            <img src="https://cdn.jsdelivr.net/gh/Redop1189/cdn/streaming/zee5.svg" alt="Zee5 logo">
            <div class="right-nav">
                <img src="https://cdn.jsdelivr.net/gh/Redop1189/cdn/streaming/zee5-premium.svg" alt="zee5 Premium Logo">
                <h2>ZEE5 Premium</h2>
            </div>
        </nav>
        <h1><span>ERROR</span></h1>
        <div style="display: block;" class="error">
            <h4>Something went wrong</h4>
            <h3>Please Check Your ZEE5 URL or VIDEO ID</h3>
        </div>
        <div class="search-box">
            <form method="get"  action="https://zee.zee5op.workers.dev" _lpchecked="1">
            <input type="search" class="searchbar" name="url" value="" placeholder="Enter ZEE5 URL or VIDEO ID" autocomplete="off">
            <button class="button" type="submit" value="" title="Stream And Enjoy !!">Stream</button>
        </div>
        <div class="info-box">
            <h3>Watch all Premium content<small>*</small> free from Zee5 without any hassle</h3>
            <h4><small>*</small>Currently DRM & ZEEPLEX content not supported<br>Working on it</h4>
            <p>No video files are stored in this website. The website simply contains user-submitted links to publicly available video stream URLs,  which to the best of our knowledge have been intentionally made public. If any links in these playlists infringe on your rights as a copyright holder, they may be removed by sending request.</p>
            <a href="https://www.instagram.com/prathameshpawar1189/">© 2021 Prathamesh Pawar</a>
        </div>
    </div>
</body>
</html>`

        
        if (mainFetch.title == undefined) {
            return new Response(erhtml, {
                status: 400,
                headers: ({
                    "Content-Type": "text/html",
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Access-Control-Allow-Origin": "*",
                    "Made-By": "https://github.com/Redop1189"
                })
            })
        } else {
            var pass = ({
                title: mainFetch.title,
                image: mainFetch.image_url.replace("270x152", "1170x658"),
                hls: `https://zee5vodnd.akamaized.net${mainFetch.hls[0].replace("drm", "hls")}${await videotoken()}`
            })
            return new Response(await template(pass.title, pass.image, pass.hls, pass.vtt_thumbnail_url), {
                status: 200,
                headers: ({
                    "Content-Type": "text/html",
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Access-Control-Allow-Origin": "*",
                    "Made-By": "https://github.com/Redop1189"
                })
            })
        }
    }
}

async function videotoken() {
    var videotokenfetch = await fetch('https://useraction.zee5.com/tokennd/')
    var videotokenfetch = await videotokenfetch.json()
    return videotokenfetch.video_token
}

async function token() {
    var tokenfetch = await fetch('https://useraction.zee5.com/token/platform_tokens.php?platform_name=web_app')
    var tokenfetch = await tokenfetch.json()
    return tokenfetch.token
}

async function template(title, thumb, hls, vtt_thumbnail_url) {
    return `<html>

<head>
  <title>${title} | Prathamesh Pawar</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <link rel="shortcut icon" type="image/x-icon" href="https://www.zee5.com/images/ZEE5_logo.svg">
  <link rel="stylesheet" href="https://cdn.plyr.io/3.6.2/plyr.css" />
  <link href="https://fonts.googleapis.com/css?family=Poppins|Quattrocento+Sans" rel="stylesheet"/>
  <script src="https://cdn.plyr.io/3.6.3/plyr.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/hls.js"></script>
</head>
<style>
html {
  font-family: Poppins;
  background: #000;
  margin: 0;
  padding: 0
}

.loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 9999;
    }
    
    .loading-text {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        width: 100%;
        height: 100px;
        line-height: 100px;
    }
    
    .loading-text span {
        display: inline-block;
        margin: 0 5px;
        color: #00b3ff;
        font-family: 'Quattrocento Sans', sans-serif;
    }
    
    .loading-text span:nth-child(1) {
        filter: blur(0px);
        animation: blur-text 1.5s 0s infinite linear alternate;
    }
    
    .loading-text span:nth-child(2) {
        filter: blur(0px);
        animation: blur-text 1.5s 0.2s infinite linear alternate;
    }
    
    .loading-text span:nth-child(3) {
        filter: blur(0px);
        animation: blur-text 1.5s 0.4s infinite linear alternate;
    }
    
    .loading-text span:nth-child(4) {
        filter: blur(0px);
        animation: blur-text 1.5s 0.6s infinite linear alternate;
    }
    
    .loading-text span:nth-child(5) {
        filter: blur(0px);
        animation: blur-text 1.5s 0.8s infinite linear alternate;
    }
    
    .loading-text span:nth-child(6) {
        filter: blur(0px);
        animation: blur-text 1.5s 1s infinite linear alternate;
    }
    
    .loading-text span:nth-child(7) {
        filter: blur(0px);
        animation: blur-text 1.5s 1.2s infinite linear alternate;
    }
    
    @keyframes blur-text {
        0% {
            filter: blur(0px);
        }
        100% {
            filter: blur(4px);
        }
    }

    .plyr__video-wrapper::before {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
        content: '';
        height: 35px;
        width: 35px;
        background: url('https://cdn.jsdelivr.net/gh/Redop1189/cdn/streaming/PP_Logo_white.svg') no-repeat;
        background-size: 35px auto, auto;
    }

</style>

<body>
  <div id="loading" class="loading">
<div class="loading-text">
    <span class="loading-text-words">T</span>
    <span class="loading-text-words">R</span>
    <span class="loading-text-words">I</span>
    <span class="loading-text-words">G</span>
    <span class="loading-text-words">G</span>
    <span class="loading-text-words">E</span>
    <span class="loading-text-words">R</span>
</div>
</div>

  <video controls crossorigin poster="${thumb}" playsinline>
    <source type="application/x-mpegURL" src="${hls}"> 
    <track kind="captions" label="EN Sub." src="${vtt_thumbnail_url}" srclang="en" default /> </video>
</body>
<script>
  setTimeout(videovisible, 4000)

function videovisible() {
    document.getElementById('loading').style.display = 'none'
}

document.addEventListener("DOMContentLoaded", () => {
  const e = document.querySelector("video"),
    n = e.getElementsByTagName("source")[0].src,
    o = {};
  if(Hls.isSupported()) {
    var config = {
      maxMaxBufferLength: 100,
    };
    const t = new Hls(config);
    t.loadSource(n), t.on(Hls.Events.MANIFEST_PARSED, function(n, l) {
      const s = t.levels.map(e => e.height);
      o.quality = {
        default: s[0],
        options: s,
        forced: !0,
        onChange: e => (function(e) {
          window.hls.levels.forEach((n, o) => {
            n.height === e && (window.hls.currentLevel = o)
          })
        })(e)
      };
      new Plyr(e, o)
    }), t.attachMedia(e), window.hls = t
  } else {
    new Plyr(e, o)
  }
});
</script>

</html>`
}
