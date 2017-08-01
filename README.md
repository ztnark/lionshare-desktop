# Lionshare Mobile

<img src="http://i.imgur.com/hOV6cDO.png" style="max-width:100%;">

This repository is a fork of the original desktop project, [Lionshare Desktop](https://github.com/lionsharecapital/lionshare-desktop)

Lionshare Mobile is a simple mobile application that helps you track cryptocurrencies and
your portfolio. Build using React Native and Redux.

For the API and other parts of the Lionshare herd, checkout our [Github page](https://github.com/lionsharecapital)
or get in touch with the team [Twitter](https://twitter.com/getlionshare).

## Development

All React Native application code is stored inside `src/`.

### Installation

To install for development, clone the repository and install the dependencies with `npm install`.

```bash
$ git clone git@github.com:ztnark/lionshare-mobile.gitfd$a
$ cd lionshare-mobile
$ npm install
```

### Running

To run the application on iOS:

```
react-native run-ios
```

To run the application on Android:

```
react-native run-android
```

## About

Lionshare is an open source project created by [Ben Jennings](https://twitter.com/benjennin_gs), [Jori Lallo](https://twitter.com/jorilallo) and [Maksim Stepanenko](https://twitter.com/maksim_s).

## Donate

Lionshare is an open source side project. To support development and keep our server running, you can donate using Bitcoin and Ethereum:

- Bitcoin: `14cYsomReqcsznbKTuW6Mh91uZm2j2AF5B`
- Ethereum: `0xbBC664b891D6Fc7EBF516594D690e370C5C32A9f`

## FAQ

**When will Lionshare support < your favorite coin >?**

Right now we're supporting coins with the most market cap listed on GDAX and Poloniex. If we're not yet supporting your favorite coin, please create an issue to [lionshare-api](https://github.com/lionsharecapital/lionshare-api/issues) repository or upvote an existing one :+1:

**Does my portfolio leave my computer?**

No, Lionshare is completely client-side and doesn't hold any keys. We take security very seriously and all our communication happens over HTTPS. All code is open source.

**How will you make money?**

We won't, this is a side project.

**When can I have a Linux, Windows, iOS, etc version?**

Right now we're focused on supporting macOS but open to adding support for other platforms in the future.

## License

MIT
