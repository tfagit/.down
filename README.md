## How to install

It's quite simple, really. First, install the required node packages:

`npm install`

Then, copy `config-template.json` to `config.json` and make any needed modifications. Particularly, the indexed folder's location might be of interest. A nice way of dealing with the relative address is to make a symbolic link of the directory to .down's folder:

`ln -s /path/to/my/directory down`

Finally, type `npm start` to get it running. That's it, you're done for now.
