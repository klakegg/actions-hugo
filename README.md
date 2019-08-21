# Hugo Action

Easy to use action to build your Hugo homepage using the [klakegg/hugo Docker images](https://hub.docker.com/r/klakegg/hugo) made available.


## Getting started

Your workflow is written in e.g. `.github/workflows/hugo.yml`.

Simple workflow example using the latest and lightest image:

```yaml
name: Hugo

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1

    - name: hugo
      uses: klakegg/actions-hugo@1.0.0
```

More advanced workflow example using matrix with multiple versions and image types:

```yaml
name: Hugo

on: [push]

jobs:
  build:
    strategy:
      matrix:
        version: [0.56.3, 0.57.2]
        image: [busybox, alpine]

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1

    - name: hugo
      uses: klakegg/actions-hugo@1.0.0
      with:
        version: ${{ matrix.version }}
        image: ${{ matrix.image }}
```


## Configuration

**version** - Sets the version of Hugo to be used during build. Defaults to *blank* when not set, resulting in using the very latest version.

**image** - Sets the image type used. Defaults to `busybox` when not set. The following are available for most versions (`ext` indicate [extended edition](https://github.com/klakegg/docker-hugo/blob/master/README.md#hugo-extended-edition)):

* busybox
* alpine
* debian
* ubuntu
* ext-alpine
* ext-debian
* ext-ubuntu

**source** - Sets the source directory to be used. Defaults to *blank*, expecting Hugo config file to be at the root of your repository.

**target** - Sets the target directory to be used. Defaults to `public`.

**command** - Sets the command to be used. Defaults to *blank*. When set is normal Hugo commands used, however `hugo` is skipped.

**pandoc_command** - Sets the Pandoc command used. Defaults to `pandoc-default`. See use of [Pandoc with Hugo](https://github.com/klakegg/docker-hugo#using-pandoc) for more information.

**env** - Sets the Hugo environemt. Defaults to `DEV`. Possible values:

* DEV
* production
