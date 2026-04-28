import { Payment, PaymentItem } from "@/constants/types.paymentdatabase";
import { Address } from "@/utils/actions/address.actions";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const format = (kobo: number) => `NGN ${(kobo / 100).toLocaleString()}`;

const formatNaira = (naira: number) => `NGN ${naira.toLocaleString()}`;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  invoiceTag: {
    fontSize: 10,
    color: "#888",
    textTransform: "uppercase",
  },

  // INFO BLOCK
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  infoBlock: {
    gap: 4,
  },
  label: {
    fontSize: 9,
    color: "#888",
    textTransform: "uppercase",
  },
  value: {
    fontSize: 12,
    fontWeight: "medium",
  },

  // TABLE
  table: {
    marginTop: 10,
    borderTop: "1px solid #eee",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottom: "1px solid #eee",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottom: "1px solid #f5f5f5",
  },
  col1: { width: "60%" },
  col2: { width: "20%", textAlign: "center" },
  col3: { width: "20%", textAlign: "right" },

  headerText: {
    fontSize: 10,
    color: "#666",
  },
  bodyText: {
    fontSize: 11,
  },

  // TOTALS
  totals: {
    marginTop: 30,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 12,
    color: "#555",
  },
  totalValue: {
    fontSize: 12,
  },

  grandTotal: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: "2px solid #000",
  },
  grandText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  // FOOTER
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#999",
  },
});

interface InvoiceDocumentProps {
  data: Payment;
  amount: number;
  address: Address | null;
}
export const InvoiceDocument = ({
  data,
  amount,
  address,
}: InvoiceDocumentProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>CASSIUS STORES</Text>
            <Text style={styles.invoiceTag}>Invoice</Text>
          </View>

          <View>
            <Text style={styles.label}>Reference</Text>
            <Text style={styles.value}>{data.reference}</Text>
          </View>
        </View>

        {/* INFO */}
        <View style={styles.infoGrid}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>Paid</Text>
          </View>
        </View>

        {/* ADDRESS */}
        {address && (
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.label}>Delivery Address</Text>

            <Text style={styles.value}>{address.full_name}</Text>

            <Text style={styles.value}>{address.street_address}</Text>

            <Text style={styles.value}>
              {address.city}, {address.state}
            </Text>

            {address.phone_number && <Text style={styles.value}>{address.phone_number}</Text>}
          </View>
        )}

        {/* TABLE */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.col1]}>Item</Text>
            <Text style={[styles.headerText, styles.col2]}>Qty</Text>
            <Text style={[styles.headerText, styles.col3]}>Amount</Text>
          </View>

          {data.metadata?.items?.map((item: PaymentItem, i: number) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.bodyText, styles.col1]}>{item.name}</Text>
              <Text style={[styles.bodyText, styles.col2]}>
                x{item.quantity}
              </Text>
              <Text style={[styles.bodyText, styles.col3]}>
                {formatNaira(item.price)}
              </Text>
            </View>
          ))}

          {/* Delivery */}
          <View style={styles.tableRow}>
            <Text style={[styles.bodyText, styles.col1]}>Delivery Fee</Text>
            <Text style={styles.col2}></Text>
            <Text style={[styles.bodyText, styles.col3]}>
              {format(data.delivery_fee)}
            </Text>
          </View>
        </View>

        {/* TOTALS */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{format(data.amount)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery</Text>
            <Text style={styles.totalValue}>{format(data.delivery_fee)}</Text>
          </View>

          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.grandText}>Total</Text>
            <Text style={styles.grandText}>{format(amount)}</Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text>Thank you for your purchase — Cassius Stores</Text>
        </View>
      </Page>
    </Document>
  );
};
