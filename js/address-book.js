$(function() {
    sortObjArray(Employees.entries, "last");
    render(Employees.entries);

    $(".sort-ui .btn").click(function() {
        var sortBtn = $(this);
        var sortBy = sortBtn.attr('data-sortby');
        sortObjArray(Employees.entries, sortBy);
        render(Employees.entries);

        $(".active").removeClass("active");
        sortBtn.addClass("active");
    });

    $('.sort-ui .btn').popover({
        content: function() {return "Click to resort by " + $( this ).html()},
        trigger: 'hover',
        placement: 'bottom',
        holder: 'body'
    });
});

function render(entries) {
    var $template = $(".template");
    var $holder = $(".address-book");
    var $repetition;
    $holder.hide();
    $holder.empty();
    $.each(entries, function() {
        $repetition= $template.clone();
        $repetition.find('.first').html(this.first);
        $repetition.find('.last').html(this.last);
        $repetition.find('.title').html(this.title);
        $repetition.find('.dept').html(this.dept);
        $repetition.find('.pic').attr({
            src: this.pic,
            alt: 'picture of '+ this.first + " " + this.last
        });
        $repetition.removeClass('template');
        $holder.append($repetition);
        $holder.fadeIn('slow');
    });
}

/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()