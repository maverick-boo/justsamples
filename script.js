/* LAKBAY PILIPINAS - script.js
   Optional enhancements only. The site works fully without this file. */

// Tell the CSS that JavaScript is running (CSS only hides things when this class exists)
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

    // 1. SCROLL REVEAL: IntersectionObserver fires when an element enters the screen
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);   // animate once, then stop watching
                }
            });
        }, { threshold: 0.15 });

        items.forEach(function (el) {
            // Stagger cards in the same row so they appear one after another
            var siblings = el.parentElement.querySelectorAll(':scope > .reveal');
            var index = Array.prototype.indexOf.call(siblings, el);
            el.style.transitionDelay = (index * 0.12) + 's';
            observer.observe(el);
        });
    } else {
        items.forEach(function (el) { el.classList.add('is-visible'); });   // old browsers: just show everything
    }

    // 2. HEADER SHADOW: add a class after the page scrolls a little
    var header = document.querySelector('.site-header');
    function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // 3. FORM FEEDBACK: runs only on the contact page
    var form = document.querySelector('form');
    var status = document.getElementById('form-status');
    if (form && status) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();   // stop the page reloading (there is no backend)
            var name = form.fullname.value.trim().split(' ')[0];
            var place = form.destination.options[form.destination.selectedIndex].text;
            // textContent (not innerHTML) so typed text can never be run as code
            status.textContent = '\u2714 Thank you, ' + name + '! Your inquiry about ' + place +
                ' was received. (This is a demo site, so nothing was actually sent.)';
            status.hidden = false;
            status.focus();           // moves focus so screen readers announce the message
            form.reset();
        });
    }
});
