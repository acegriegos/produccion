<ul class="collapsible" data-collapsible="accordion">
{section name=LE loop=$PRE}
{math assign="tot" equation="(x*100)/y" x=$PRE[LE][7] y=$PRE[LE][6]}
  <li>
    <div class="collapsible-header shpre" id="p{$PRE[LE][5]}"><i class="fa fa-ellipsis-v"></i>{$PRE[LE][0]}<span id="montopre" class="der">{$PRE[LE][8]} ({$tot|number_format:2:".":","}%)</span>
      <div class="progress">
        <div class="determinate green" title="{$PRE[LE][2]}" style="width: {$tot}%"></div>
      </div>
    </div>
    <div class="collapsible-body">

    </div>
  </li>
{/section}
</ul>