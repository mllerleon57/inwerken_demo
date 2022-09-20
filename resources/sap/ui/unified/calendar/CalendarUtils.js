/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/date/UniversalDate","./CalendarDate","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/core/format/TimezoneUtil"],function(e,t,a,n,r){"use strict";var i={};i.MAX_MILLISECONDS=864e13;i.HOURS24=1e3*3600*24;i._createLocalDate=function(t,a){var n;if(t){var r;if(t instanceof e){r=t.getJSDate()}else{r=t}n=new Date(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate());if(r.getFullYear()<1e3){n.setFullYear(r.getFullYear())}if(a){n.setHours(r.getUTCHours());n.setMinutes(r.getUTCMinutes());n.setSeconds(r.getUTCSeconds());n.setMilliseconds(r.getUTCMilliseconds())}}return n};i._createUTCDate=function(t,a){var n;if(t){var r;if(t instanceof e){r=t.getJSDate()}else{r=t}n=new Date(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate()));if(r.getFullYear()<1e3){n.setUTCFullYear(r.getFullYear())}if(a){n.setUTCHours(r.getHours());n.setUTCMinutes(r.getMinutes());n.setUTCSeconds(r.getSeconds());n.setUTCMilliseconds(r.getMilliseconds())}}return n};i._createUniversalUTCDate=function(t,a,n){var r;if(a){r=e.getInstance(this._createUTCDate(t,n),a)}else{r=new e(this._createUTCDate(t,n).getTime())}return r};i.calculateWeekNumber=function(t,a,n,r){var i=0;var s=0;var g=r.getFirstDayOfWeek();var u=r.firstDayStartsFirstWeek();if(u){var o=new e(t.getTime());o.setUTCFullYear(a,0,1);s=o.getUTCDay();var l=new e(t.getTime());l.setUTCDate(l.getUTCDate()-l.getUTCDay()+s);i=Math.round((l.getTime()-o.getTime())/864e5/7)+1}else{var C=new e(t.getTime());C.setUTCDate(C.getUTCDate()-g);s=C.getUTCDay();C.setUTCDate(C.getUTCDate()-s+4);var T=new e(C.getTime());T.setUTCMonth(0,1);s=T.getUTCDay();var D=0;if(s>4){D=7}var f=new e(T.getTime());f.setUTCDate(1-s+4+D);i=Math.round((C.getTime()-f.getTime())/864e5/7)+1}return i};i.getFirstDateOfWeek=function(t,a){var r=new e(t.getTime()),i,s,g=n.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()),u=sap.ui.getCore().getConfiguration().getLocale(),o=g.getFirstDayOfWeek(),l;if(!a||(a.firstDayOfWeek===-1||a.firstDayOfWeek===undefined)){a={firstDayOfWeek:g.getFirstDayOfWeek(),minimalDaysInFirstWeek:g.getMinimalDaysInFirstWeek()}}l=e.getWeekByDate(r.getCalendarType(),r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),u,a);i=e.getFirstDateOfWeek(r.getCalendarType(),l.year,l.week,u,a);s=new e(e.UTC(i.year,i.month,i.day));if(a&&(a.firstDayOfWeek===-1||a.firstDayOfWeek===undefined)){while(s.getUTCDay()!==o){s.setUTCDate(s.getUTCDate()-1)}}return new e(e.UTC(s.getUTCFullYear(),s.getUTCMonth(),s.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds())).getJSDate()};i.getFirstDateOfMonth=function(t){var a=new e(t.getTime());a.setUTCDate(1);return a};i._getNumberOfWeeksForYear=function(e){var t=sap.ui.getCore().getConfiguration().getFormatLocale(),r=n.getInstance(new a(t)),i=new Date(Date.UTC(e,0,1)),s=i.getUTCDay(),g=52;if(r.getFirstDayOfWeek()===0){if(s===5||s===6){g=53}}else{if(s===3||s===4){g=53}}return g};i.monthsDiffer=function(e,t){return e.getMonth()!==t.getMonth()||e.getFullYear()!==t.getFullYear()};i.isDateLastInMonth=function(e){var t=new Date(e.getTime()+24*60*60*1e3);return t.getUTCDate()<e.getUTCDate()};i._updateUTCDate=function(e,t,a,n,r,i,s,g){if(t!=null){e.setUTCFullYear(t)}if(a!=null){e.setUTCMonth(a)}if(n!=null){e.setUTCDate(n)}if(r!=null){e.setUTCHours(r)}if(i!=null){e.setUTCMinutes(i)}if(s!=null){e.setUTCSeconds(s)}if(g!=null){e.setUTCMilliseconds(g)}};i._checkJSDateObject=function(e){if(!e||Object.prototype.toString.call(e)!=="[object Date]"||isNaN(e)){throw new Error("Date must be a JavaScript date object.")}};i._checkYearInValidRange=function(e){if(typeof e!=="number"||e<1||e>9999){throw new Error("Year must be in valid range (between year 0001 and year 9999).")}};i._isNextMonth=function(e,t){return e.getMonth()>t.getMonth()&&e.getFullYear()===t.getFullYear()||e.getFullYear()>t.getFullYear()};i._minutesBetween=function(e,t){var a=(t.getTime()-e.getTime())/1e3;a=a/60;return Math.abs(Math.round(a))};i._areCurrentMinutesLessThan=function(e){var t=(new Date).getMinutes();return e>=t};i._areCurrentMinutesMoreThan=function(e){var t=(new Date).getMinutes();return e<=t};i._monthsBetween=function(e,t,a){var n=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())),r=new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate())),i;n.setUTCFullYear(e.getUTCFullYear());r.setUTCFullYear(t.getUTCFullYear());i=r.getUTCFullYear()*12+r.getUTCMonth()-(n.getUTCFullYear()*12+n.getUTCMonth());if(!a){i=Math.abs(i)}return i};i._hoursBetween=function(e,t){var a=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours()));var n=new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours()));a.setUTCFullYear(e.getUTCFullYear());n.setUTCFullYear(t.getUTCFullYear());return Math.abs((a.getTime()-n.getTime())/(1e3*60*60))};i._isMidnight=function(e){return e.getHours()===0&&e.getMinutes()===0&&e.getSeconds()===0&&e.getMilliseconds()===0};i._daysInMonth=function(e){this._checkCalendarDate(e);e=new t(e);e.setDate(1);e.setMonth(e.getMonth()+1);e.setDate(0);return e.getDate()};i._isLastDateInMonth=function(e){return e.getDate()===i._daysInMonth(e)};i._getFirstDateOfWeek=function(e,a){var r=n.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale());this._checkCalendarDate(e);if(!a||(a.firstDayOfWeek===-1||a.firstDayOfWeek===undefined)){a={firstDayOfWeek:r.getFirstDayOfWeek(),minimalDaysInFirstWeek:r.getMinimalDaysInFirstWeek()}}if(e.getDay()!==a.firstDayOfWeek){var s=i.getFirstDateOfWeek(e.toUTCJSDate(),a);s.setFullYear(s.getUTCFullYear(),s.getUTCMonth(),s.getUTCDate());return t.fromLocalJSDate(s,e.getCalendarType())}return e};i._getFirstDateOfMonth=function(e){this._checkCalendarDate(e);var a=i.getFirstDateOfMonth(e.toUTCJSDate()).getJSDate();a.setFullYear(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate());return t.fromLocalJSDate(a,e.getCalendarType())};i._minDate=function(e){var a=new t(1,0,1,e);a.setYear(1);a.setMonth(0);a.setDate(1);return a};i._maxDate=function(e){var a=new t(9999,11,1,e);a.setYear(9999);a.setMonth(11);a.setDate(this._daysInMonth(a));return new t(a)};i._isBetween=function(e,t,a,n){this._checkCalendarDate(e);this._checkCalendarDate(t);this._checkCalendarDate(a);if(n){return e.isSameOrAfter(t)&&e.isSameOrBefore(a)}else{return e.isAfter(t)&&e.isBefore(a)}};i._daysBetween=function(e,t){this._checkCalendarDate(e);this._checkCalendarDate(t);return Math.ceil((e.valueOf()-t.valueOf())/this.HOURS24)};i._isOutside=function(e,t,a){return!this._isBetween(e,t,a,true)};i._isSameMonthAndYear=function(e,t){this._checkCalendarDate(e);this._checkCalendarDate(t);return e.getEra()===t.getEra()&&e.getYear()===t.getYear()&&e.getMonth()===t.getMonth()};i._checkCalendarDate=function(e){if(!e||!(e instanceof t)){throw"Invalid calendar date: ["+e+"]. Expected: sap.ui.unified.calendar.CalendarDate"}};i._getWeek=function(t){this._checkCalendarDate(t);return e.getWeekByDate(t.getCalendarType(),t.getYear(),t.getMonth(),t.getDate())};i._isWeekend=function(e,t){var a=e.getDay();return a===t.getWeekendStart()||a===t.getWeekendEnd()};i._convertToTimezone=function(e,t){var a=new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds());a.setUTCFullYear(e.getUTCFullYear());a=r.convertToTimezone(a,t);return a};return i},true);
//# sourceMappingURL=CalendarUtils.js.map