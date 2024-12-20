import { Message, run } from "./oscReceiver";
import hash from "object-hash";
import zalgo from "to-zalgo";
import { buildMaps } from "./emojis";

const modWords = [
  `
f̵͔̮͖̖͕̃̎̏̒̍̚͝ͅư̵̻̔̑̀͒͌̏̀͘c̵̦͓̟͉͇͆̊̑͑̉͘̚͝k̸̡͍̤͚̯̇̃ ̶̤͚̣̜̋̇̇̿̉͊͑͝y̷̨̯̩͈͉̣͑͆͂̚è̷̛̜͖̬̪̳̱͐̐̈̓̏̋͐ͅŝ̴͖̋̈̓́
`,
  `
Į̸̤̣̯̐̀́̓͐͒͋ ̵̙͂͛̓͑ḩ̸͉̈̓̋͒a̸͖̤̣̖̞̪͋̈́͌̈́̚v̷̡̢̖̩͔͇̻̅͊͊̿̿͛̚͜͠͠ͅḙ̵̓̊̑͆̑̐͊͠͠n̶̟̻͓̙̫̤͉̬̉̍͆̀̈̓̅̕̚̕'̴̛̺̙̞̼̲͋̒̏͑̈́̑͐t̴̺̻̣́́̃̀͂̂̈͠ ̷̥̗̰̩̹͂̌͛͌š̴̫̘̦̦̼̳̓̋̀̉͆͝e̷̟̙̥̜͉̝̔͊͆̈́̉̈͋̂͛͑ͅḛ̸̢͊̈̊̊̿n̷͙̪͉̩͇͑̓ ̸͎̭̰̳͙̤́ǎ̷̿̐̾̚͜͝ ̸͚̩̻̞̼͓̖̤̜̎̾̈̋̽́̂͘͝n̸̮͇̒́̂͝ȩ̷̪̙̠̠̯̩̫̈́̈́̇̊̉̈́̑͛̕͜w̴̡̢̩͇̱̜̦͖͈̞̅̾̚ ̴͒͂̾ͅc̸͕̯̙̖̰̰̺͖͖̭̕y̷̳̥̦̮͂̆͛̾̉̕c̶̡̣̗̠̝͉͚̥̊̋̅̓̌̀̆̔̐l̷͙̬̗̙̒̊̈̃̾̚͠e̸̘͂̓̎̂̄̓͝ ̶̨̡̗̹͔͇̹́̽͊͆̈ͅs̶͎͌̆͋̉̈͗͐̚͝͠i̴̲̖̟͍̭̣͎̰̎̐͋́̎̓͛̏͘͠ṇ̷̦͓̾̉͂͛̽̋͗͛c̷̭͚͈̹̑̊ͅȇ̶̟̒ ̴͖̗̠̰͕̲̤̹̅̽̈t̴͚̏̀̓̍̏̓͝h̸̡͔̠̳̗̽̀̂ȩ̵̘͉̓̍̊̒̈͝ ̴̹̮͍̮̲̰̗̭͈͛̐͑͌͐̄̕ļ̵̢̯̟̠̻͓̰͓͛͜a̷̢̻̼̞͚̫̫̎̐̀̎̏̄̃̄͆͝s̵̡̻̟̭̣̼͎̻̮͙̈ț̵̘̝́̃̉͛́̄͋̄́ ̸̨̖͔̟̺̽̀̇̐ẗ̶͍͔̰͉̭̻̳̩̠̝́̏͊̌i̴̗̓͐̾̆m̵͎͔̯̠̩̦̗͎̉̉͋̍̍̂͝ͅë̶̜́̌̅̏̎
`,
  `s̸̮͖͍̊̂ͅḙ̴̛͙̱̹̊̔̀̂̽̄̐̔̾e̸̟̎ ̸͍͓̥̺͖̹͚͌̒̚y̶̨̪̜͕͈̮̫͕̮̆̂̾̿̆͆͌͐͌o̶͙̖̅̾ú̶̥̱ ̸̫̲̜͖͕̙̖̮̇͊͂̑̽͠i̴͍̪͋́͌̐̔̓̊͝n̵̨̪̫͙͎͖̈́̄̆͊͝ ̷̠̥̦̤̺͔͖̯̣͈̕͝t̶̢̯͇̟̳͎͚́̚͜ĥ̸̞̠̯̜̹͕̝̉̈̌̿͌̉̉͜ė̶̱̣̗͖̟̘̜͂͌͒̈̆̈̓̕͜ ̵̢̞̹͚̼̮̔̈́̅̊͐̀̀̐̍͊f̴̨̧̲͔̲̠̻̭͆̒̈́̕ǜ̸̡͓̹͕̗̼̝̮̃̈́͂̊͝ṯ̴̨̭̲̙̈́̈́͝͝ư̸͔̺͉̯̄̄͊̂̌̚̚͜͠ṛ̵͛̀͗̀͐ȩ̸̨̡̖̼̬̮̲̅͑͒̿̍̿̍͌͝ ̷̧̧̪̜̲̣̰̐̕͜ï̶̝͙̩̟̦̙͍͈̳͜͝f̴̻̼̤̉̐̂̋̈́̀͝͝ͅ ̷͖̞̹̤̫͕̳̃̎͠ͅņ̵̥̰͓̘̪͕̝̏̽̽̓́̿ͅṍ̴̞̖̹̖̌̎́̄͆͆̕̕t̶̤̮͎̭̠̹́͗̊̾̕ ̵͙͖̳͂͒l̷̨̦̻̫̼͖̻̳̀̈̈́̑͂̄͠ã̸̻̖̹̼̼́̄̆̿̀̓̾̿̕t̷̛̩͎̘̆̒͆̾̃̑̋͜ę̵̙̒r̴͙̹̠̚
`,
];

let maps = buildMaps();
const changeMapCount = 20;

const messageHandler = (dict: Message) => {
  if (dict.progNum || dict.midichan === undefined) {
    return;
  }

  if (dict.cycle % changeMapCount === 0) {
    maps = buildMaps();
  }

  const { firstMap, secondMap } = maps;

  const emoji =
    dict.s === "rytm"
      ? firstMap[dict.midichan ?? 12] ?? "🫠"
      : (dict.amp ?? 0) > 0.4
      ? secondMap[dict.midichan ?? 12]
      : "...";

  if (dict.cycle % 25 === 0) {
    process.stdout.write(
      ` ${dict.cycle} cycles ${modWords[Math.floor(dict.cycle) % 3]} `
    );
  }

  process.stdout.write(`${emoji}${emoji}`);

  if (!dict.isCc && dict.s === "rytm" && dict.midichan === 2) {
    const hsh = hash(dict).substring(0, 16);

    process.stdout.write(` ${zalgo(hsh)} `);
  }
};

run(messageHandler);
