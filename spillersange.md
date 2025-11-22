---
layout: page
title: Spillersange
permalink: /spillersange/
---

# {{ page.title }}

<div class="song-group">
  <h2>Nuværende spillere</h2>
  <div class="song-list">
  {% for song in site.spillersange_nuvaerende %}
    {{ song.content }}
  {% endfor %}
  </div>
</div>

<div class="song-group">
  <h2>Tidligere spillere</h2>
  <div class="song-list">
  {% for song in site.spillersange_tidligere %}
    {{ song.content }}
  {% endfor %}
  </div>
</div>
