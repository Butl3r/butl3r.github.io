---
layout: post
title: Secure includes from CDNs
date: 2020-08-22
preview: When including resources from CDNs, how do you ensure the security of the file, has it changed? is it the expected version?
comments: true
categories: 
    - "general"
    - "websecurity"
---

## Introduction

With supply chain attacks becoming more prevalent, have you thought about what you include from CDNs on your website? Are you implicily trusting that the CDN is looking after the security for you? You have this awesome library that powers your site, but how do you know what gets loaded is what you expect, hasn't been manipulated, is the version you are expecting.... 

When including external resources you need to be very careful, as you could be opening a big hole in the security of your site. This could lead to many attack vectors, from defacement of your site to an attacker stealing session information from your users granting them access as that user.

Fortunately there is a feature in modern web browsers (Chrome, Firefox, Edge Chromium and Safari - Visit [https://caniuse.com/#feat=subresource-integrity](https://caniuse.com/#feat=subresource-integrity) for full compatability) that allows you to securely include resources from external sources. This feature is called "Subresource Integrity" (SRI), and it is a very simple and elegant way to solve this problem.

## How it works

Within the included markup you add an attribute named "integrity" which contains the hash value of the expected file. The browser downloads the resource and then calculates the hash of the download file. If they don't match it is disregarding/not loaded on your site. This is a very simple but highly effective way to handle the problem. If there is any difference, regardless of the file size being the same (Smart attackers would hide there tracks by removing the same number of bytes they have added) then this hash would be different.

What is looks like in practice:

### Javascript

```html
<script src="https://some.cdn.com/your/awesome/library" integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC" crossorigin="anonymous">
```

### CSS

```html
<link rel="stylesheet" href="https://some.cdn.com/your/awesome/library" integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC" crossorigin="anonymous" />
```

* Note the cross origin value, this is to handle the CORS.

## How to calculate the hash

So how do you calculate this hash value? The below commands will get you what you need. Remember to include the hash algorithm at the start of the value e.g. SHA384-

### Website

This website will do the calculation for you: [https://www.srihash.org/](https://www.srihash.org/)

### OpenSSL

```bash
cat FILENAME.js | openssl dgst -sha384 -binary | openssl base64 -A
```

### Shasum

```bash
shasum -b -a 384 FILENAME.js | awk '{ print $1 }' | xxd -r -p | base64
```


## Sources/Useful links

[https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
