jQuery(document).ready(function($){
    url = window.location.href;

    all_labels = {
      'freni': [
          'Codice',
          'Corrente',
          'Coppia Frenante Statica Nm',
          'Velocità max motore rpm',
          'Potenza max W',
          'Max rumorosità dB',
          'Peso Kg'
      ],
      'raddrizzatori': [
          'Codice',
          'Certificazione',
          'Entrata 50-60Hz V',
          'Uscita V',
          'Portata Imax A',
          'Fusibile A',
          'Colore Cavetti Input',
          'Colore Cavetti Output'
      ]
    };

    labels = [];

    if (url.indexOf("raddrizzatori") >= 0) labels = all_labels.raddrizzatori;
    if (url.indexOf("freni") >= 0) labels = all_labels.freni;

    table = 'table.tab_prod';
    
    // nascondo la tabella base
    $(table).hide();

    if($(table).find('tr').length > 0){
        // Trasformo la tabella in array chiave valore prendendo soilo ciÃ² che mi serve
        rows = [];
        $trs = $(table).find('tr');
        max = $trs.length;
        i = 0;

        for (i = 0; i < max;) {
            keys = $($trs[i]).find('th');
            values = $($trs[i+1]).find('td');
            row = [];
            $.each(keys, function(ii){
                k = $(this).text();
                v = $(values[ii]).html();
                if(labels.includes(k)) row[k] = v;
            });
            rows.push(row);
            i=i+2;
        }
        //console.log(rows);

        // ricreo una nuova tabella
        $(table).parent().append('<table id="tab_prod"></table>');
        $newTable = $('#tab_prod');
        // Header
        $tHead = $newTable.append('<thead></thead>').find('thead');
        $thr = $tHead.append('<tr></tr>').find('tr');
        labels.map(function(o,i){
            $th = $thr.append('<th></th>').find('th');
            $($th[i]).html(o);
        });
        // Body
        $tBody = $newTable.append('<tbody></tbody>').find('tbody');
        rows.map(function(row, ix){
            $tr = $tBody.append('<tr></tr>').find('tr');
            labels.map(function(o,i){
                $td = $($tr[ix]).append('<td></td>').find('td');
                //console.log(row[o]);
                $($td[i]).html(row[o]);
            });
        });
    }

});