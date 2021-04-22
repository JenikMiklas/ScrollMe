# ScrollMe
The js class creating smooth animation during scrolling or navigating on a page.

## Install

### 1. Define pages (sections)
For example, your web project has 3 pages (sections).
Add the class attribute to each page (section). In this case "mySection". All sections have the same class name.
```
<body>
  <section class="mySection">
    <h1>Page 1</h1>
  </section>
  <section class="mySection">
    <h1>Page 2</h1>
  </section>
  <section class="mySection">
    <h1>Page 3</h1>
  </section>
</body>
```
### 2. Define navigation
In this example is added navigation list. Each navigation element has to have a unique class name.
```
<body>
  <ul>
    <li class="navPage1">#1</li>
    <li class="navPage2">#2</li>
    <li class="navPage3">#3</li>
  </ul>
  <section class="mySection">
    <h1>Page 1</h1>
  </section>
  <section class="mySection">
    <h1>Page 2</h1>
  </section>
  <section class="mySection">
    <h1>Page 3</h1>
  </section>
</body>
```
### 3. Add ScrollMe
Import and create ScrollMe instance.
```
<body>
  <ul>
    <li class="navPage1">#1</li>
    <li class="navPage2">#2</li>
    <li class="navPage3">#3</li>
  </ul>
  <section class="mySection">
    <h1>Page 1</h1>
  </section>
  <section class="mySection">
    <h1>Page 2</h1>
  </section>
  <section class="mySection">
    <h1>Page 3</h1>
  </section>
  <script src="scrollme.js"></script>
  <script>
    let scrollMe = new ScrollMe(".mySection", [".navPage1", ".navPage2", ".navPage3"])
    scrollMe.duration = 2000
  </script>
</body>
```
The first parameter is the name of the section class. The second parameter is the array of all navigation items.
The animation duration is set to 2 seconds.
```
   let scrollMe = new ScrollMe(".mySection", [".navPage1", ".navPage2", ".navPage3"])
   scrollMe.duration = 2000

```
