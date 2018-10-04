$(() => {
    const crypto = require('crypto')

    $('#radioBtn a').on('click', function(){
        var sel = $(this).data('title');
        var tog = $(this).data('toggle');
        $('#'+tog).prop('value', sel);
        isUpperCase = sel;
        $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
    })

    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
    }

    function newGuid(isUpper)
    {
        var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4());
        if(isUpper == 'Y')
        return guid.toUpperCase()
        else
        return guid.toLowerCase() 
    }

    $('#btnGenerate').bind('input click', function() {
        var isUpperCase = $('#isUpperCase').val()
        if(isUpperCase == ''){isUpperCase = 'Y'}
        var dividerType = $('#dividerType').val()
        var guidCount = $('#txtGuidCount').val()
        var guidList = ''
        if(guidCount != '')
        {
            if(guidCount == 1){dividerType = ''}
            for(var i = 0; i < guidCount; i++)
            {
                guidList += newGuid(isUpperCase) + dividerType + '\n';
            }
            if(guidCount > 1){guidList = guidList.substring(0, guidList.length-2)}
            $('#txtGuidList').text(guidList)
        }
        else
        alert('You should enter a valid count!');
    })

    $('#btnClear').bind('input click', function() {
        $('#txtGuidList').text('')
    })

    $('#btnMd5').bind('input click', function() {
        var textToHash = $('#txtString').val()
        if(stringControl(textToHash))
        {
            const md5 = crypto.createHash('md5').update(textToHash, 'utf8').digest('hex')
            $('#txtHashedText').text(md5)
        }
    })

    $('#btnBase64').bind('input click', function() {
        var textToHash = $('#txtString').val()
        const base64 = Buffer.from(textToHash).toString('base64')
        $('#txtHashedText').text(base64)
    })

    $('#btnHsa1').bind('input click', function() {
        var textToHash = $('#txtString').val()
        const sha1 = crypto.createHash('sha1').update(textToHash, 'utf8').digest('hex')
        $('#txtHashedText').text(sha1)
    })

    $('#btnHas256').bind('input click', function() {
        var textToHash = $('#txtString').val()
        const sha256 = crypto.createHash('sha256').update(textToHash, 'utf8').digest('hex')
        $('#txtHashedText').text(sha256)
    })

    $('#btnHsa512').bind('input click', function() {
        var textToHash = $('#txtString').val()
        const sha512 = crypto.createHash('sha512').update(textToHash, 'utf8').digest('hex')
        $('#txtHashedText').text(sha512)
    })

    function stringControl(context)
    {
        if(context == '')
        {
            alert('String is empty!');
            return false;
        }
        else
        {
            return true;
        }
    }

    $('#btnClearString').bind('input click', function() {
        $('#txtHashedText').text('')
        $('#txtString').val('')
    })
  })
