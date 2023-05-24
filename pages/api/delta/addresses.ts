import * as Server from '@common/server';

import DB from '@common/db';

/*
f1scktstaqsefqepo5rxi7wdmhzlxkxypxwtyc2zy
f17ooyz25jj5mvwrswmfqaw2umno7gubnhshdrliq
f1mte2a65hayg6ogzwsopffyh35qdcknywifjbtfa
f1jfnu74cg5nkawacw4tuposvhlstottnjl33qgla
f1m2bpe7ns2zuj23uf5ibeyje3kqe3sb7fjjmwe7y
f1tuoahmuwfhnxpugqigxliu4muasggezw2efuczq
f1jxx7uendecy62l2m7w7tyo5d7wszysp467xztfy
*/

/*
echo f1jxx7uendecy62l2m7w7tyo5d7wszysp467xztfy | xargs printf '{ "jsonrpc": "2.0", "id":1, "method": "Filecoin.StateLookupID", "params": [ "%s", null ] }' | curl https://api.chain.love/rpc/v0 -s -XPOST -H "Content-Type: application/json" -d@/dev/stdin | jq -r .result

*/

export default async function APIGlobalDeltaIndex(req, res) {
  await Server.cors(req, res);

  res.json({
    addresses: [
      {
        id: 'f02096010',
        address: 'f1z5ykhx7qi2jeukwlve3mu2zbcuzrtewhc3iajmi',
      },
      {
        id: 'f0397376',
        address: 'f3vnq2cmwig3qjisnx5hobxvsd4drn4f54xfxnv4tciw6vnjdsf5xipgafreprh5riwmgtcirpcdmi3urbg36a',
      },
      {
        id: 'f02034522',
        address: 'f14wtf7z3k3rx4wtb5s24lwafxkfyuyeewyybz7vi',
      },
      {
        id: 'f02179305',
        address: 'f1stkkjijjh2l33f3qpx5z63fdz3ukfnki5tku5jy',
      },
      {
        id: 'f02179349',
        address: 'f1rc75rubsis6cz5wzbspwztedpmlxc2qqa2gn7ry',
      },
      {
        id: 'f02179351',
        address: 'f1w7i3irv46dfeyfiekgngnr7nyp6pods7kzznq2a',
      },
      {
        id: 'f02034523',
        address: 'f1p3l3wgnfukemmaupqecwcoqp7fcgjcqgqcq7rja',
      },
      {
        id: 'f01900756',
        address: 'f1bg3khvfgh6v4n37oxyoy7rzuh74r7lw77gu7z7a',
      },
      {
        id: 'f02097399',
        address: 'f1tozx7o6g6xqeuq4xr3vzm75x6uymgjrf5ofzfia',
      },
      {
        id: 'f02052093',
        address: 'f1mmb3lx7lnzkwsvhridvpugnuzo4mq2xjmawvnfi',
      },
    ],
  });
}
