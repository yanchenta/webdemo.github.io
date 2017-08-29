/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 14-6-10
 * Time: 上午1:38
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    $(".rselected").find(".tab").css({opacity: 0});
    $(".rselected").find(".listItem_content").css({opacity: 0});
    itemSelected();
    tabSelected();
});


function tabSelected() {
    $(".rselected").find(".tab").each(function () {
        $(this).click(function () {
            $(".rselected").find(".tab").css({opacity: 0});
            $(this).animate({opacity: .3}, 200);
            zd();
            if ($(this).attr("class").indexOf("title_tab_l") > -1) {
                $(".length_list").removeClass("Dn").removeClass("Do");
                $(".passBall_list").addClass("Dn").addClass("Do");
                zy();
            } else {
                $(".passBall_list").removeClass("Dn").removeClass("Do");
                $(".length_list").addClass("Dn").addClass("Do");
            }
        });
    });
}

function itemSelected() {
    $(".rselected").find(".listItem").each(function () {
        $(this).click(function () {
            $(".rselected").find(".listItem_content").css({opacity: 0});
            $(this).children().animate({opacity: .3}, 200);
        });
    });
}
function zd()
{
	alert('sdf');
	$.cookie('req',2);
	pagere();
}
function zy()
{
	$.cookie('req',1);
	pagere();
}