$(function () {
  const vs = {
    'p1c': 0, 'p1t': 0, 'p1s': 0, 'p1p': 0,
    'p2c': 0, 'p2t': 0, 'p2s': 0, 'p2p': 0,
    'p3c': 0, 'p3t': 0, 'p3s': 0, 'p3p': 0,
    'p4c': 0, 'p4t': 0, 'p4s': 0, 'p4p': 0,
    'cot': 0, 'tot': 0, 'sut': 0,
    'com': 5, 'tom': 4, 'sum': 3
  };

  function recalc() {
    // total resoruces
    vs.cot = vs.p1c + vs.p2c + vs.p3c + vs.p4c;
    vs.tot = vs.p1t + vs.p2t + vs.p3t + vs.p4t;
    vs.sut = vs.p1s + vs.p2s + vs.p3s + vs.p4s;
    // cotton multiplier
    if (vs.cot >= vs.tot && vs.cot >= vs.sut) vs.com = 5;
    else if (vs.cot >= vs.tot || vs.cot >= vs.sut) vs.com = 4;
    else vs.com = 3;
    // tobacco multiplier
    if (vs.tot > vs.cot && vs.tot >= vs.sut) vs.tom = 5;
    else if (vs.tot > vs.cot || vs.tot >= vs.sut) vs.tom = 4;
    else vs.tom = 3;
    // sugar multiplier
    if (vs.sut > vs.cot && vs.sut > vs.tot) vs.sum = 5;
    else if (vs.sut > vs.cot || vs.sut > vs.tot) vs.sum = 4;
    else vs.sum = 3;
    // player points
    vs.p1p = vs.p1c * vs.com + vs.p1t * vs.tom + vs.p1s * vs.sum;
    vs.p2p = vs.p2c * vs.com + vs.p2t * vs.tom + vs.p2s * vs.sum;
    vs.p3p = vs.p3c * vs.com + vs.p3t * vs.tom + vs.p3s * vs.sum;
    vs.p4p = vs.p4c * vs.com + vs.p4t * vs.tom + vs.p4s * vs.sum;
    update();
  }

  function update() {
    // total resources
    $('#co-total').val(vs.cot);
    $('#to-total').val(vs.tot);
    $('#su-total').val(vs.sut);
    // multipliers
    $('#co-mult').val('x' + vs.com);
    $('#to-mult').val('x' + vs.tom);
    $('#su-mult').val('x' + vs.sum);
    // player points
    $('#p1-i-x').val(vs.p1p);
    $('#p2-i-x').val(vs.p2p);
    $('#p3-i-x').val(vs.p3p);
    $('#p4-i-x').val(vs.p4p);
  }

  $('.btn').on('click', function (event) {
    const button = $(event.target);
    const [player, sign, type] = button.attr('id').split('-');
    const input = $(`#${player}-i-${type}`);
    const id = player + type;
    if (sign === 'plus') { if (vs[id] < 100) vs[id]++; }
    else { if (vs[id] > 0) vs[id]--; }

    input.val(vs[id]);
    recalc();
  });

  $('.inp').on('focus', function (event) {
    const input = $(event.target);
    input.select();
  }).on('input', function (event) {
    const input = $(event.target);
    let value = input.val();

    if (isNaN(value) || value === '') value = 0;
    else if (value > 99) value = 99;
    else if (value < 0) value = 0;
    value = parseInt(value);

    const id = input.attr('id').replace('-i-', '');
    vs[id] = value;
    input.val(value);
    recalc();
  });

})