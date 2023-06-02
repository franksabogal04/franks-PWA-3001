const btnInstalled = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('entered')
    console.log("event" + event)
    event.preventDefault();
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class
    btnInstalled.classList.toggle('hidden', false);
});

btnInstalled.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Show prompt
    promptEvent.prompt();

    // Reset the deferred prompt
    window.deferredPrompt = null;

    btnInstalled.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {

    console.log('install')
    window.deferredPrompt = null;
}); 