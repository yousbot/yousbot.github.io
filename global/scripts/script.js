function showContent(id) {
    const sections = ["vision", "products", "about-us"];
    sections.forEach(sec => {
        const el = document.getElementById(sec);
        if (el) el.classList.add("hidden");
    });
    const target = document.getElementById(id);
    if (target) target.classList.remove("hidden");
}

window.onload = () => showContent('vision');