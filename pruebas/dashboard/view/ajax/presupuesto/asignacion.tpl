<ul class="collapsible" data-collapsible="accordion">
{section name=LE loop=$PRE}
{math assign="tot" equation="(x*100)/y" x=$PRE[LE][7] y=$PRE[LE][6]}
  <li>
    <div class="row collapsible-header shpre" id="p{$PRE[LE][5]}">
        <div class="col s1">
            <i class="mdi mdi-dots-vertical"></i>
        </div>
        <div class="col s1">
            <b>{$PRE[LE][0]}</b>
        </div>
        <div class="col s2 center">
            <span id="montopre">{$PRE[LE][8]}</span>
        </div>
        <div class="col s7 center">
            <div class="progress">
                <div class="determinate btn2" title="{$PRE[LE][2]}" style="width: {$tot}%"></div>
           </div>
        </div>
        <div class="col s1">
            <label for="montopre">({$tot|number_format:2:".":","}%)</label>
        </div>
    </div>
    <div class="collapsible-body" style="padding-top: 0"><!-- JS --></div>
  </li>
{/section}
</ul>