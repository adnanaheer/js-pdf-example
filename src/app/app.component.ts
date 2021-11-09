import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import * as moment from 'moment'
import data from './data.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'jspdf';
  ngOnInit(): void {
    // this.generateCriminalListPdf(data)
  }
  generateCriminalListPdf(criminalData: any = data) {
    const headerText = "Our service searches and gathers public records, including criminal public records. PeopleFinders Pro does not make any representation or warranty about the accuracy of the information providedor the character or integrity of the person about whom you inquire. Federal, state, and local government agencies and other law enforcement agencies make certain court records publicly available.These court records could include criminal information specific to a person’s public identity, such as felonies, misdemeanors, arrests, or infractions. These court records, however, can containinaccuracies, be incomplete or not be associated with the person in this report. The information provided here should not be used as substitute for your own due diligence, including verifying a person’s criminal history at the appropriate courthouse"

    //     doc.setFontType("normal");
    // doc.setFontType("italic");
    // doc.setFontType("bold");
    // doc.setFontType("bolditalic");
    console.log('data', criminalData)
    let doc = new jsPDF();
    let yAxis = 10;

    doc.setFontSize(7);
    doc.setTextColor("#dc143c");
    const splitTitle = doc.splitTextToSize(headerText, 190);
    doc.text(splitTitle, 5, yAxis);
    let data;
    for (let index = 0; index < criminalData.length; index++) {
      data = criminalData[index]
      doc.setFillColor(22, 130, 228);
      doc.rect(5, yAxis + 15, 195, 10, "F");
      doc.setTextColor("#ffffff");
      doc.setFontSize(11);
      // doc.setFontType("bold");
      doc.text("Search Information:", 10, yAxis + 21);
      // doc.setFontType("normal");
      doc.text("All Criminal Records", 48, yAxis + 21);
      yAxis += 30;
      if (yAxis >= 250) {
        yAxis = 10
        doc.addPage();
      }

      if (data.names) {
        console.log('daya', data.names)

        for (let index = 0; index < data.names.length; index++) {
          doc.setTextColor("#0000");
          doc.setFontSize(6);
          // doc.setFontType("bold");
          doc.text("tahoeId:", 8, yAxis);
          doc.text("First Name:", 80, yAxis);
          doc.text("Middle Name:", 130, yAxis);
          doc.text("Last Name:", 8, yAxis + 4);
          doc.text("DOB:", 80, yAxis + 4);

          doc.setTextColor("#313131");
          doc.setFontSize(6);
          //doc.setFontType("normal");
          doc.text(data.names[index].tahoeId ? data.names[index].tahoeId : 'N/A', 17, yAxis);
          doc.text(data.names[index].firstName ? data.names[index].firstName : 'N/A', 93, yAxis);
          doc.text(data.names[index].middleName ? data.names[index].middleName : 'N/A', 145, yAxis);
          doc.text(data.names[index].lastName ? data.names[index].lastName : 'N/A', 21, yAxis + 4);
          if (data.offenderAttributes && data.offenderAttributes[index] && data.offenderAttributes[index].dob) {
            doc.text(data.offenderAttributes && data.offenderAttributes[index] && data.offenderAttributes[index].dob ? data.offenderAttributes[index].dob : 'N/A', 86, yAxis + 4);

          }
          doc.setDrawColor('#7E7E7E');
          //  doc.line(8, yAxis + 8, 200, yAxis + 8);
          // doc.line(5, yAxis+8, 60, 25)
          yAxis += 8;
          if (yAxis >= 250) {
            yAxis = 10
            doc.addPage();
          }
        }
      }

      doc.setFillColor(22, 130, 228);
      doc.rect(5, yAxis, 195, 10, "F");
      doc.setTextColor("#ffffff");
      doc.setFontSize(11);
      // doc.setFontType("bold");
      if (data.names.length) {
        doc.text(data.names[0].fullName, 10, yAxis + 7);

      }
      if (data.offenderAttributes.length) {
        doc.text(data.offenderAttributes && data.offenderAttributes[0].dob ? data.offenderAttributes[0].dob : 'N/A', 70, yAxis + 7);
      }

      if (data.shortCat) {
        //  doc.setFontType("normal");
        doc.text(data && data.shortCat, 185, yAxis + 7);
      }

      yAxis += 10;
      if (yAxis >= 250) {
        yAxis = 10
        doc.addPage();
      }

      //  headings

      doc.setTextColor("#AAAAAA");
      doc.setFontSize(8);
      //   doc.setFontType("bold");
      doc.text("Subject Identification", 8, yAxis + 7);
      doc.text(" Subject Description", 70, yAxis + 7);
      doc.text("Case Information", 130, yAxis + 7);
      yAxis += 11
      if (yAxis >= 250) {
        yAxis = 10
        doc.addPage();
      }
      //  Subject Identification

      let descAxis = yAxis
      let caseAxis = yAxis

      if (data.names.length) {
        console.log('daya', data.names)
        for (let index = 0; index < data.names.length; index++) {

          doc.setTextColor("#0000");
          doc.setFontSize(6);
          //doc.setFontType("bold");

          doc.text("Name:", 8, yAxis);
          doc.text("DOB:", 8, yAxis + 3);
          doc.text("Addresses:", 8, yAxis + 6);
          doc.setTextColor("#313131");
          doc.setFontSize(6);
          /// doc.setFontType("normal");
          // values
          doc.text(data.names[0] && data.names[0].fullName, 16, yAxis);
          if (data.offenderAttributes && data.offenderAttributes[index] && data.offenderAttributes[index].dob) {
            doc.text(data.offenderAttributes[index] && data.offenderAttributes[index].dob ? data.offenderAttributes[index].dob : 'N/A', 16, yAxis + 3);

          }
          const addresses = data.addresses.map((address: { fullAddress: any; }) => { return address.fullAddress });
          doc.text(addresses ? addresses : 'N/A', 20, yAxis + 6);

          yAxis += 14
          if (yAxis >= 250) {
            yAxis = 10
            descAxis = yAxis
            caseAxis = yAxis
            doc.addPage();
          }
        }
      }

      // subject description

      if (data.offenderAttributes.length) {
        for (let index = 0; index < data.offenderAttributes.length; index++) {

          doc.setTextColor("#0000");
          doc.setFontSize(6);
          // doc.setFontType("bold");

          doc.text("Sex:", 70, descAxis);
          doc.text("Height:", 70, descAxis + 3);
          doc.text("Weight:", 70, descAxis + 6);

          doc.setTextColor("#313131");
          doc.setFontSize(6);
          // doc.setFontType("normal");
          // values
          if (data.offenderAttributes[index] && data.offenderAttributes[index].sex) {
            doc.text(data.offenderAttributes[index].sex, 80, descAxis);
          }
          if (data.offenderAttributes[index] && data.offenderAttributes[index].height) {
            doc.text(data.offenderAttributes[index].height, 80, descAxis + 3);
          }
          if (data.offenderAttributes[index] && data.offenderAttributes[index].weight) {
            doc.text(data.offenderAttributes[index].weight, 80, descAxis + 6);
          }
          descAxis += 14
          if (yAxis >= 250) {
            yAxis = 10
            doc.addPage();
          }


        }
      }

      //case info
      if (data.caseDetails.length) {
        for (let index = 0; index < data.caseDetails.length; index++) {

          doc.setTextColor("#0000");
          doc.setFontSize(6);
          // doc.setFontType("bold");

          doc.text("Case #:", 130, caseAxis);
          doc.text("Category:", 130, caseAxis + 3);
          doc.text("Court:", 130, caseAxis + 6);
          doc.text("Court County:", 130, caseAxis + 9);

          doc.setTextColor("#313131");
          doc.setFontSize(6);
          // doc.setFontType("normal");
          // values
          if (data.caseDetails[index] && data.caseDetails[index].caseNumber) {
            doc.text(data.caseDetails[index].caseNumber, 140, caseAxis);
          }
          if (data.caseDetails[index] && data.caseDetails[index].mappedCategory) {
            doc.text(data.caseDetails[index].mappedCategory, 140, caseAxis + 3);

          }
          if (data.caseDetails[index] && data.caseDetails[index].court) {
            doc.text(data.caseDetails[index].court, 140, caseAxis + 6);
          }
          if (data.caseDetails[index] && data.caseDetails[index].courtCounty) {
            doc.text(data.caseDetails[index].courtCounty, 146, caseAxis + 9);
          }
          caseAxis += 16
          if (yAxis >= 250) {
            yAxis = 10
            doc.addPage();
          }
        }
      }
      const greather = Math.max(caseAxis, descAxis, yAxis)
      yAxis = greather;

      // offense

      for (let index = 0; index < data.offenses.length; index++) {
        doc.line(8, yAxis + 5, 200, yAxis + 5);
        doc.setTextColor("#313131");
        doc.setFontSize(6);
        //  doc.setFontType("normal");
        doc.text('offence ' + String(index + 1) + ' of ' + String(data.offenses.length), 10, yAxis + 10)
        doc.line(8, yAxis + 15, 200, yAxis + 15);
        yAxis += 23

        doc.setTextColor("#0000");
        doc.setFontSize(6);
        //   doc.setFontType("bold");

        doc.text("Offense Codes:", 8, yAxis);
        doc.text("Charged File On:", 50, yAxis);
        doc.text("Disposition:", 130, yAxis);
        doc.text("Disposition Date:", 8, yAxis + 4);
        doc.text("Offense Description:", 50, yAxis + 4);
        doc.text("State:", 130, yAxis + 4);

        doc.setTextColor("#313131");
        doc.setFontSize(6);
        //  doc.setFontType("normal");
        if (data.offenses[index] && data.offenses[index].offenseCodes) {
          doc.text(data.offenses[index].offenseCodes[0], 25, yAxis);

        }
        if (data.offenses[index] && data.offenses[index].chargesFiledDate) {
          doc.text(data.offenses[index].chargesFiledDate, 68, yAxis);

        }
        if (data.offenses[index] && data.offenses[index].disposition) {
          doc.text(data.offenses[index].disposition, 145, yAxis);

        }

        if (data.offenses[index] && data.offenses[index].dispositionDate) {
          doc.text(data.offenses[index] && data.offenses[index].dispositionDate, 27, yAxis + 4);

        }
        if (data.offenses[index] && data.offenses[index].offenseDescription) {
          const splitString = doc.splitTextToSize(data.offenses[index].offenseDescription, 45);
          doc.text(splitString, 72, yAxis + 4);

        }
        if (data.offenses[index] && data.offenses[index].sourceState) {
          doc.text(data.offenses[index].sourceState, 138, yAxis + 4);

        }

        yAxis += 15;
        if (yAxis >= 250) {
          yAxis = 10
          doc.addPage();
        }
      }
    }
    //  this.addFooters(doc)
    //  this.addHeaders(doc)
    const pdf = doc.output("blob");
    this.downloadFiles(
      pdf,
      "Criminal_list_pdf" +
      " " +
      "(" +
      this.formatCalendarDate(new Date()) +
      ").pdf"
    );
    // this.receiptsService
    //           .getPresignedUrl({
    //             key: res[0].filename
    //           })
    //           .subscribe((res) => {
    //             console.log(res);
    //             var x = window.open(res.url);
    //           });
    //       },
    //       (errors) => { }
    //     );
    // console.log(blobUrl);
    // doc.output('two-by-four.pdf')
  }

  downloadFiles = (blob: any, fileName: string) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  };

  formatCalendarDate = function (dateTime: Date) {
    return moment.utc(dateTime).format("MM-DD-YYYY");
  }

}

