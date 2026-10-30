document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);   
                }
            });
        }, { threshold: 0.15 });

        items.forEach(function (el) {
            var siblings = el.parentElement.querySelectorAll(':scope > .reveal');
            var index = Array.prototype.indexOf.call(siblings, el);
            el.style.transitionDelay = (index * 0.12) + 's';
            observer.observe(el);
        });
    } else {
        items.forEach(function (el) { el.classList.add('is-visible'); });   
    }

    var header = document.querySelector('.site-header');
    function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    
    var form = document.querySelector('form');
    var status = document.getElementById('form-status');
    if (form && status) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();   
            var name = form.fullname.value.trim().split(' ')[0];
            var place = form.destination.options[form.destination.selectedIndex].text;
            status.textContent = '\u2714 Thank you, ' + name + '! Your inquiry about ' + place +
                ' was received. (This is a demo site, so nothing was actually sent.)';
            status.hidden = false;
            status.focus();          
            form.reset();
        });
    }
});
