import { Liveblocks } from '@liveblocks/node';

const key = process.env.LIVEBLOCKS_PRIVATE_KEY;

if (!key) {
  throw new Error(
    'You must provide the LIVEBLOCKS_PRIVATE_KEY environment variable'
  );
}

const liveblocks = new Liveblocks({ secret: key });

export default liveblocks;
