(function() {
    console.log("ElegantAnnouncements: Loaded");

    async function fetchStatus() {
        try {
            const response = await fetch('/ElegantAnnouncements/Status');
            if(response.ok) {
                const data = await response.json();
                handleGeneral(data.General);
                handleShutdown(data.Shutdown);
            }
        } catch (error) {
            console.error("ElegantAnnouncements: API Error", error);
        }
    }

    function handleGeneral(config) {
        if (!config.Enabled) return;
        if (localStorage.getItem('ef_closed_' + config.Id)) return;

        let el = document.getElementById('ef-general-announcement');
        if (!el) {
            el = document.createElement('div');
            el.id = 'ef-general-announcement';
            document.body.appendChild(el);
        }
        
        el.innerHTML = `<span>${config.Message}</span><span class="ef-close-btn">&times;</span>`;
        // Small timeout to allow CSS transition to work on creation
        setTimeout(() => el.classList.add('active'), 100);

        el.querySelector('.ef-close-btn').onclick = function() {
            el.classList.remove('active');
            localStorage.setItem('ef_closed_' + config.Id, 'true');
        };
    }

    function handleShutdown(config) {
        if (!config.TargetTime) return;

        let el = document.getElementById('ef-shutdown-alert');
        if (!el) {
            el = document.createElement('div');
            el.id = 'ef-shutdown-alert';
            document.body.appendChild(el);
        }

        const target = new Date(config.TargetTime).getTime();
        const now = new Date().getTime();
        const diff = target - now;
        
        if (diff < 0 && diff > -600000) { 
            el.innerHTML = "⚠️ Server is shutting down...";
            el.classList.add('active');
            return;
        } else if (diff < -600000) {
            el.classList.remove('active');
            return;
        }

        const minsLeft = Math.floor(diff / 60000);
        const secsLeft = Math.floor((diff % 60000) / 1000);
        
        let shouldShow = false;
        let isPermanent = false;

        if (minsLeft <= 5) {
            shouldShow = true;
            isPermanent = true;
        } else if (minsLeft <= 30 && minsLeft % 5 === 0 && secsLeft < 10) {
            shouldShow = true; 
        } else if (minsLeft <= 60 && minsLeft % 10 === 0 && secsLeft < 10) {
            shouldShow = true; 
        } else if (minsLeft <= 120 && minsLeft % 30 === 0 && secsLeft < 10) {
            shouldShow = true;
        } else if (minsLeft > 120 && minsLeft % 60 === 0 && secsLeft < 10) {
            shouldShow = true;
        }

        if (shouldShow) {
            const timeStr = minsLeft > 60 
                ? Math.ceil(minsLeft/60) + " hours" 
                : (minsLeft + 1) + " minutes";
                
            el.innerHTML = `⚠️ Server maintenance in ${timeStr}`;
            el.classList.add('active');

            if (!isPermanent && secsLeft > 9) {
                el.classList.remove('active');
            }
        } else {
            el.classList.remove('active');
        }
    }

    setInterval(fetchStatus, 1000);
})();