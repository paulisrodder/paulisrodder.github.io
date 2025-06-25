---
layout: page
title: Klubsange
permalink: /klubsange/
---

<div class="songs-list">
  {% for song in site.songs %}
    <div class="song-card" tabindex="0" onclick="toggleLyrics(this)" onkeypress="if(event.key==='Enter'){toggleLyrics(this)}">
      <span class="song-icon">🎶</span>
      <h2>{{ song.title }} <span class="expand-arrow">▶</span></h2>
      <p>{{ song.excerpt }}</p>
      <div class="song-lyrics">
        {{ song.content | markdownify }}
      </div>
    </div>
  {% endfor %}
</div>

<script>
function toggleLyrics(card) {
  card.classList.toggle('expanded');
}
</script>