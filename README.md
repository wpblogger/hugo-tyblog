# Tyblog!

This is a blog theme for a new [Hugo](https://gohugo.io) project.

## How to use

```
hugo new site foo
cd foo
git clone --depth 1 https://github.com/wpblogger/hugo-tyblog themes/hugo-tyblog
```

Edit your `config.toml` to add:

```
theme = 'hugo-tyblog'
```

Then:

```
hugo new posts/hello.md
```

Edit the `content/posts/hello.md` file to get rid of `draft: true` and add some content.

```
hugo server
```

...and behold the beauty of localhost:1313. Then get to work!
